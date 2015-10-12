'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let component = di.load('en/component');
let logger = component.get('en/logger');
const IS_ANY_PATTERN = /<([^>]+)>/;
const PATTERN_MATCH = /<(\w+):([^>]+)>/g;
const HAS_GROUP = /^\(([^\)]+)\)$/;
/**
 * @license Mit Licence 2015
 * @since 0.1.0
 * @author Igor Ivanovic
 * @name Router
 *
 * @constructor
 * @description
 * Router handler for easy node
 */
class RouteRule extends Type {
    constructor(config, dynamic) {
        super({
            pattern: Type.ARRAY,
            url: Type.STRING,
            route: Type.STRING,
            validMethods: Type.ARRAY,
            methods: Type.ARRAY
        });
        this.validMethods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'CONNECT', 'PATCH'];
        this.methods = ['GET'];
        if (Type.isArray(config.methods) && !config.methods.every(item => this.validMethods.indexOf(item) > -1)) {
            throw new error.HttpError(500, `RouteRule: rule must contain valid methods`, {
                config: config,
                methods: this.methods
            });
        } else if (Type.isArray(config.methods)) {
            this.methods = config.methods;
        }
        if (!dynamic) {
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
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name RouteRule#getPattern
     * @param {String} url
     *
     * @description
     * Creates pattern based on url provided
     */
    getPattern(url) {

        return url.split('/').filter(item => !!item).map(item => {
            // pattern definition
            let obj = {
                patterns: [],
                getKey(index) {
                    let pattern = this.patterns[index];
                    if (Type.isObject(pattern)) {
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
                            if (Type.isString(result)) {
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
                    let pattern = new RegExp(source);
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
                            if (Type.isString(nKey)) {
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
                    let pattern = new RegExp(source);
                    obj.patterns.push({
                        source,
                        key,
                        start,
                        end,
                        match() {
                            return true;
                        },
                        replace(item, value, nKey) {
                            if (Type.isString(nKey)) {
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
            obj.pattern = new RegExp(obj.source);

            return obj;
        });
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name RouteRule#parseRequest
     * @param {String} pathname
     * @param {String} method
     *
     * @description
     * Parse request and get result
     */
    parseRequest(pathname, method) {
        let url = pathname.split('/').filter(item => !!item);
        if (this.pattern.length !== url.length || this.methods.indexOf(method) === -1) {
            return false;
        }
        let query = new Map();
        let isValidRequest = this.pattern.every((pattern, index) => {
            let part = url[index];
            let result = pattern.match(part);
            result.forEach((k, v) => query.set(k, v));
            return Type.isObject(result);
        });
        if (!isValidRequest) {
            return false;
        }
        return {
            pathname,
            method,
            query
        };
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
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
        } else if (Type.isObject(params)) {
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

        let url = matches.join('/');

        if (paramsMap.size > 0) {
            url += '?';
            paramsMap.forEach((v, k) => {
                url += k + '=' + encodeURIComponent(v);
            });
        }

        return '/' + url;
    }
}

module.exports = RouteRule;