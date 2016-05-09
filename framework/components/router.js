'use strict';

let di = require('../di');
let core = di.load('@{appix}/core');
let error = di.load('@{appix}/error');
let RouteRule = di.load('@{appix}/route-rule');
let Component = di.load('@{appix}/component');
let logger;
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @class
 * @name Router
 * @param {Object} config
 * @param {Bootstrap} bootstrap instance
 * @constructor
 * @description
 * Router is a component in easy node application.
 * Router handles routing for application.
 * All routes should be added during bootstrap process
 * @example
 * 'use strict';
 * let di = require('appix');
 * let Bootstrap = di.load('@{appix}/bootstrap');
 * // bootstrap application
 * let easyInit = new Bootstrap({
 *   listenPort: 9500,
 *   appPath:  __dirname + '/'
 * });
 *
 * di.setInstance('en-demo', easyInit);
 * let router = easyInit.getComponent('appix/router');
 * router.add([
 *    {
 *        url: '/',
 *        route: 'app/Index'
 *    },
 *    {
 *        url: '/forward',
 *        route: 'app/Forward',
 *        dataEvent: true
 *    },
 *    {
 *        url: '/test',
 *        route: 'app/Test'
 *    },
 *    {
 *        url: '/test-pall',
 *        route: 'app/TestPall'
 *    },
 *    {
 *        url: '/goto301',
 *        route: 'app/Redirect301'
 *    },
 *    {
 *        url: '/goto',
 *        route: 'app/Redirect'
 *    },
 *    {
 *        url: '/favicon.ico',
 *        route: 'app/Favicon'
 *    }
 * ]);
 *
 * easyInit.listen();
 *
 * // env.json change or add component configs
 * // in order to have custom handler useCustomErrorHandler must be true
 * "appix/router": {
 *    "useCustomErrorHandler": true,
 *    "url": "/error",
 *    "route": "error/handler"
 * }
 */
class Router extends Component {
    constructor(config, bootstrap) {
        super(config, bootstrap);
        if (!core.isObject(config)) {
            config = {};
        }

        this.bootstrap = bootstrap;
        this.routes = new Set();
        this.error = {};
        this.methods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'CONNECT', 'PATCH'];
        this.useCustomErrorHandler = config.useCustomErrorHandler;

        logger = bootstrap.getComponent('appix/logger');
        logger.info('Router.constructor', {
            config: config,
            instance: this
        });

        if (core.isObject(config) && !!config.useCustomErrorHandler) {
            this.error = Object.assign({
                url: '/error',
                route: 'error/handler',
                methods: this.methods
            }, config);
            this.add(this.error);
        }

    }

    /**
     * @since 1.0.0
     * @function
     * @name Router#add
     * @param {RouteRule|Object|Array|Function} Rule
     *
     * @description
     * Add route to resolve list.
     * To add custom rule you must inherit from RouteRule class.
     * All rules must be instanceof RouteRule.
     * If you add array or object it will be converted to RouteRule.
     *
     */
    add(Rule) {
        if (core.isArray(Rule)) {
            return Rule.forEach(item => this.add(item));
        } else if (core.isObject(Rule) && !(Rule instanceof RouteRule)) {
            return this.add(new RouteRule(this.bootstrap, Rule));
        } else if (core.isFunction(Rule)) {
            return this.add(new Rule());
        }

        if (!(Rule instanceof RouteRule)) {
            throw new error.HttpException(500, 'rule must be instance of RouteRule class', {
                rule: Rule
            });
        }

        logger.info('Router.add', Rule);
        this.routes.add(Rule);
    }

    /**
     * @since 1.0.0

     * @function
     * @name Router#parseRequest
     * @param {String} pathName
     * @param {String} method
     * @param {Object} headers
     *
     * @description
     * Parse request based on pathName and method
     */
    parseRequest(pathName, method, headers) {
        let promises = new Set();
        for (let route of this.routes) {
            let parsedRequest = route.parseRequest(pathName, method, headers);
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

            throw new error.HttpException(404, `Router.parseRequest: ${pathName} no route found, method: ${method}`, {
                pathName,
                method
            });
        });
    }

    /**
     * @since 1.0.0

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