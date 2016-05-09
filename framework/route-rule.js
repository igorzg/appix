'use strict';

let di = require('./di');
let core = di.load('@{appix}/core');
let error = di.load('@{appix}/error');
let logger;
const IS_ANY_PATTERN = /<([^>]+)>/;
const PATTERN_MATCH = /<(\w+):([^>]+)>/g;
const HAS_GROUP = /^\(([^\)]+)\)$/;
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @class
 * @name RouteRule
 * @param {Bootstrap} bootstrap instance
 * @param {Object} config
 * @param {Object} types extend route rule on inherit while implementing custom parseRequest and createUrl
 * @constructor
 * @description
 * Route rule is used to add route definitions to router.
 * To enable data event dataEvent property has to be passed to router as dataEvent: true
 * @example
 * class DynamicRule extends RouteRule {
 *   parseRequest(pathname, method) {
 *      let query = {};
 *      let route = 'user/contact';
 *      return {
            pathname,
            method,
            query,
            dataEvent: true,
            route
        }
 *   }
 *   createUrl() {
 *
 *   }
 * }
 *
 * // during bootstrap process add dynamic route rule
 * let router = bootstrap.getComponent('appix/router');
 * router.add(DynamicRule);
 * // add static routes
 * router.add([
 *    {
 *        url: '/',
 *        route: 'app/Index',
 *        dataEvent: true
 *    },
 *    {
 *        url: '/favicon.ico',
 *        route: 'app/Favicon'
 *    }
 * ]);
 */
class RouteRule {
    constructor(bootstrap, config) {
        

        logger = bootstrap.getComponent('appix/logger');

        this.bootstrap = bootstrap;
        this.validMethods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'CONNECT', 'PATCH'];
        this.methods = ['GET'];
        this.dataEvent = config.dataEvent || false;

        if (core.isArray(config.methods) && !config.methods.every(item => this.validMethods.indexOf(item) > -1)) {
            throw new error.HttpError(500, `RouteRule: rule must contain valid methods`, {
                config: config,
                methods: this.methods
            });
        } else if (core.isArray(config.methods)) {
            this.methods = config.methods;
        }
        if (config.hasOwnProperty('url') || config.hasOwnProperty('route')) {
            if (!config.url) {
                throw new error.HttpError(500, 'RouteRule: rule object must have an pattern property', config);
            }
            if (!config.route) {
                throw new error.HttpError(500, 'RouteRule: rule object must have an route property', config);
            }

            this.url = config.url;
            this.route = config.route;
            this.pattern = this.getPattern(this.url);
        }
        logger.info('RouteRule.construct', this.__dynamic__);
    }

    /**
     * @since 1.0.0
     * @function
     * @name RouteRule#getPattern
     * @param {String} url
     * @private
     *
     * @description
     * Creates pattern based on url provided
     */
    getPattern(url) {
        return url.split(/\/([^\/]+)\//g).filter(item => !!item).map(item => {
            // pattern definition
            let obj = {
                patterns: [],
                getKey(index) {
                    let pattern = this.patterns[index];
                    if (core.isObject(pattern)) {
                        return pattern.key;
                    }
                    return false;
                },
                keys() {
                    return this.patterns.slice().map(item => item.key);
                },
                match(value) {
                    if (!this.pattern.test(value)) {
                        return false;
                    }
                    let result = new Map();
                    let matches = value.match(this.pattern).slice(1);
                    matches.forEach((item, index) => {
                        result.set(this.getKey(index), item);
                    });
                    return result;
                },
                replace(params) {
                    let source = obj.original;
                    params.forEach((value, key) => {
                        let patterns = this.patterns.slice();
                        while (patterns.length > 0) {
                            let pattern = patterns.shift();
                            let result = pattern.replace(source, value, key);
                            if (core.isString(result)) {
                                source = result;
                            }
                        }
                    });
                    return source;
                },
                source: item,
                original: item,
                pattern: null
            };

            if (PATTERN_MATCH.test(item)) {
                item.replace(PATTERN_MATCH, (replace, key, source, index) => {
                    if (!HAS_GROUP.test(source)) {
                        source = '(' + source + ')';
                    }
                    let pattern = new RegExp('^' + source + '$');
                    let start = index;
                    let end = start + replace.length;
                    obj.patterns.push({
                        source,
                        pattern,
                        key,
                        start,
                        end,
                        match(value) {
                            return pattern.test(value.slice(start, end));
                        },
                        replace(item, value, nKey) {
                            if (core.isString(nKey)) {
                                if (nKey !== key || !pattern.test(value)) {
                                    return false;
                                }
                            }
                            return item.replace(replace, value);
                        }
                    });
                });
            } else if (IS_ANY_PATTERN.test(item)) {
                item.replace(IS_ANY_PATTERN, (replace, key, index) => {
                    let start = index;
                    let end = start + replace.length;
                    let source = '([\\s\\S]+)';
                    let pattern = new RegExp('^' + source + '$');
                    obj.patterns.push({
                        source,
                        key,
                        start,
                        end,
                        match() {
                            return true;
                        },
                        replace(item, value, nKey) {
                            if (core.isString(nKey)) {
                                if (nKey !== key || !pattern.test(value)) {
                                    return false;
                                }
                            }
                            return item.replace(replace, value);
                        }
                    });
                });
            } else {
                let start = 0;
                let end = item.length;
                obj.patterns.push({
                    key: false,
                    item,
                    start,
                    end,
                    match(value) {
                        return value === item;
                    },
                    replaceSource(item) {
                        return item;
                    },
                    replace(item) {
                        return item;
                    }
                });
            }
            // apply source
            obj.patterns.forEach(item => {
                obj.source = item.replace(obj.source, item.source);
            });
            // pattern
            obj.pattern = new RegExp('^' + obj.source + '$');

            return obj;
        });
    }

    /**
     * @since 1.0.0
     * @function
     * @name RouteRule#parseRequest
     * @param {String} pathname
     * @param {String} method
     *
     * @description
     * Parse request and get result when route rule is extend following object structure has to be returned.
     * @return {Object}
     *
     * @example
     * parseRequest(pathname, method) {
     *  return {
     *    pathname,
     *    method,
     *    query,
     *    dataEvent: true,
     *    route
     *  }
     * }
     */
    parseRequest(pathname, method) {
        let url = pathname.split(/\/([^\/]+)\//g).filter(item => !!item);
        let pl = this.pattern.length;
        if (this.methods.indexOf(method) === -1) {
            return false;
        } else if (url.length > pl) {
            let last = url.splice(pl, url.length - 1);
            last.unshift(url.pop());
            url.push(last.join('/'));
        }
        let query = {};
        let isValidRequest = this.pattern.every((pattern, index) => {
            let part = url[index];
            let result = pattern.match(part);
            if (result) {
                result.forEach((v, k) => query[k] = v);
                return core.isObject(result);
            }
            return false;
        });
        if (!isValidRequest) {
            return false;
        }
        return {
            pathname,
            method,
            query,
            dataEvent: this.dataEvent,
            route: this.route
        };
    }

    /**
     * @since 1.0.0
     * @function
     * @name RouteRule#createUrl
     * @param {String} route
     * @param {Map} params
     *
     * @description
     * Create url based on parameters and route
     */
    createUrl(route, params) {
        if (this.route !== route) {
            return false;
        }
        let matches = [];
        let patterns = this.pattern.slice();
        let paramsMap = new Map();

        if (params instanceof Map) {
            paramsMap = new Map(params);
        } else if (core.isObject(params)) {
            Object.keys(params).forEach(k => paramsMap.set(k, params[k]));
        }

        let keys = new Set();

        while (patterns.length > 0) {
            let pattern = patterns.shift();
            let url = pattern.replace(paramsMap);
            if (IS_ANY_PATTERN.test(url) || PATTERN_MATCH.test(url)) {
                return false;
            }
            pattern.keys().forEach(item => keys.add(item));
            matches.push(url);
        }

        keys.forEach(key => paramsMap.delete(key));

        let url = ('/' + matches.join('/')).replace(/\/\//g, '/');
        if (paramsMap.size > 0) {
            url += '?';
            paramsMap.forEach((v, k) => {
                url += k + '=' + encodeURIComponent(v);
            });
        }
        return url;
    }
}

module.exports = RouteRule;