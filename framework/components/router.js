'use strict';

let di = require('../di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let RouteRule = di.load('@{en}/route-rule');
let logger;
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name Router
 *
 * @constructor
 * @description
 * Router handler for easy node
 */
class Router extends Type {
    constructor(config, app) {
        super({
            routes: Type.OBJECT,
            app: Type.OBJECT,
            methods: Type.ARRAY,
            errorRoute: Type.STRING
        });
        if (!Type.isObject(config)) {
            config = {};
        }

        this.app = app;

        this.routes = new Set();
        this.errorRoute = config.errorRoute || 'error/handler';
        this.methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'CONNECT', 'PATCH'];

        if (Type.isObject(config) && !!config.useCustomErrorHandler) {
            this.add(Object.assign({
                url: '/error',
                route: 'error/handler',
                methods: this.methods
            }, config));
        }

        logger = app.getComponent('en/logger');
        logger.info('Router.constructor', {
            config: config,
            instance: this
        });
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Router#add
     * @param {Object|Array} rule
     *
     * @description
     * Add route to resolve list
     */
    add(rule) {
        if (Type.isArray(rule)) {
            return rule.forEach(item => this.add(item));
        } else if (Type.isObject(rule) && !(rule instanceof RouteRule)) {
            return this.add(new RouteRule(this.app, rule));
        }

        if (!(rule instanceof RouteRule)) {
            throw new error.HttpException(500, 'rule must be instance of RouteRule class', {
                rule: rule
            });
        }

        logger.info('Router.add', rule);
        this.routes.add(rule);
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Router#parseRequest
     * @param {String} pathName
     * @param {String} method
     *
     * @description
     * Parse request based on pathName and method
     */
    parseRequest(pathName, method) {
        let promises = new Set();
        for (let route of this.routes) {
            let parsedRequest = route.parseRequest(pathName, method);
            if (!!parsedRequest) {
                promises.add(parsedRequest);
            }
        }
        return Promise.all(promises).then(values => {

            while (values.length > 0) {
                let value = values.shift();
                if (!!value) {
                    return value;
                }
            }

            throw new error.HttpException(404, 'Router.parseRequest: no request found', {
                pathName,
                method
            });
        });
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Router#createUrl
     * @param {String} routeName
     * @param {Object} params
     *
     * @description
     * Create url based on route and params
     */
    createUrl(routeName, params) {
        let promises = new Set();
        for (let route of this.routes) {
            let parsedRequest = route.createUrl(routeName, params);
            if (!!parsedRequest) {
                promises.add(parsedRequest);
            }
        }
        return Promise.all(promises).then(values => {

            while (values.length > 0) {
                let value = values.shift();
                if (!!value) {
                    return value;
                }
            }

            if (params.size > 0) {
                routeName += '?';
                params.forEach((v, k) => {
                    routeName += k + '=' + encodeURIComponent(v);
                });
            }

            return '/' + routeName;
        });
    }
}

module.exports = Router;