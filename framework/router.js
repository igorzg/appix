'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let RouteRule = di.load('@{en}/route-rule');
let error = di.load('@{en}/error');
let component = di.load('@{en}/component');
let logger = component.get('logger');
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
class Router extends Type {
    constructor(config) {
        super(
            {
                routes: Type.ARRAY,
                methods: Type.ARRAY,
                errorRoute: Type.STRING
            }
        );
        this.routes = [];
        this.errorRoute = config.errorRoute || 'error/handler';
        this.methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'CONNECT', 'PATCH'];

        if (Type.isObject(config) && config.useCustomErrorHandler) {
            this.add(Object.assign({
                url: '/error',
                route: 'error/handler',
                methods: this.methods
            }, config));
        }
        logger.info('Router.constructor', {
            config: config,
            instance: this
        });
    }

    /**
     * @since 0.1.0
     * @author Igor Ivanovic
     * @function
     * @name DI#add
     * @param {Object|Array} rule
     *
     * @description
     * Add route to resolve list
     */
    add(rule) {
        if (Type.isArray(rule)) {
            return rule.forEach(this.add);
        } else if (Type.isObject(rule) && !(rule instanceof RouteRule)) {
            return this.add(new RouteRule(rule));
        }

        if (!(rule instanceof RouteRule)) {
            throw new error.HttpError(500, 'rule must be instance of RouteRule class', rule);
        }

        logger.info('Router.add', rule);
        this.routes.add(rule);
    }
}

module.exports = Router;