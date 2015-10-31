'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let Filter = di.load('@{en}/filter');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name Controller
 * @param {Object} api
 * @param {Object} types
 * @constructor
 * @description
 * Controller is constructed on each request.
 * All application controllers should be inherited from controller class
 * @example
 *  let di = require('easy-node');
 *  let Controller = di.load('@{en}/controller');
 *  let Filter = di.load('@{en}/filter');
 *  class F1 extends Filter {
 *    afterEach(data) {
 *       return di.async(function* gen() {
 *           return yield data + ' prio';
 *       });
 *    }
 *  }
 *  class MyAppController extends Controller {
 *
 *    constructor(api) {
 *       super(api, {
 *          name: Type.STRING
 *       });
 *       this.name = 'We must define type if we want to have extended object with new members';
 *       this.addFilter(F1, 10);
 *    }
 *
 *    actionIndex() {
 *      return 'WORKS';
 *    }
 *  }
 */
class Controller extends Type {
    constructor(api, types) {
        super(Object.assign({
            __request__: Type.OBJECT,
            __chaining__: Type.BOOLEAN,
            __filters__: Type.ARRAY
        }, types));
        this.__chaining__ = true;
        this.__request__ = api;
        this.__filters__ = [];
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getMethod
     *
     * @description
     * Return method
     * @return {String}
     */
    getMethod() {
        return this.__request__.getMethod();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getParams
     *
     * @description
     * Return params
     * @return {Object}
     */
    getParams() {
        return this.__request__.getParams();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getParsedUrl
     *
     * @description
     * Return parsed url
     * @return {Object}
     */
    getParsedUrl() {
        return this.__request__.getParsedUrl();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestBody
     *
     * @description
     * Get request body, return data sent to server.
     * @return {Buffer}
     */
    getRequestBody() {
        return this.__request__.getRequestBody();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getPathname
     *
     * @description
     * Get request pathname
     * @return {String}
     */
    getPathname() {
        return this.__request__.getPathname();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestDomain
     *
     * @description
     * Get request domain
     * @return {String}
     */
    getRequestDomain() {
        return this.__request__.getRequestDomain();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestHeaders
     *
     * @description
     * Get request headers, key value pairs
     * @return {Object}
     */
    getRequestHeaders() {
        return this.__request__.getRequestHeaders();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestLocalAddress
     *
     * @description
     * Get request local address
     * @return {String}
     */
    getRequestLocalAddress() {
        return this.__request__.getRequestLocalAddress();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestLocalPort
     *
     * @description
     * Get request local port
     * @return {Number}
     */
    getRequestLocalPort() {
        return this.__request__.getRequestLocalPort();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestRemoteAddress
     *
     * @description
     * Get request remote address
     * @return {String}
     */
    getRequestRemoteAddress() {
        return this.__request__.getRequestRemoteAddress();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestRemotePort
     *
     * @description
     * Get request remote port
     * @return {Number}
     */
    getRequestRemotePort() {
        return this.__request__.getRequestRemotePort();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#onEnd
     *
     * @description
     * On end is an happening on destroy event
     */
    onEnd(callback) {
        return this.__request__.onEnd(callback);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#forwardUrl
     * @param {String} route
     * @param {Object} params
     *
     * @description
     * forward url
     * @return {Promise}
     */
    forwardRoute(route, params) {
        return this.__request__.forwardRoute(route, params);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#forwardUrl
     * @param {String} url
     *
     * @description
     * forward url
     * @return {Promise}
     */
    forwardUrl(url) {
        return this.__request__.forwardUrl(url);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestRoute
     *
     * @description
     * Get request route
     * @return {String}
     */
    getRequestRoute() {
        return this.__request__.route;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestController
     *
     * @description
     * Get request controller
     * @return {String}
     */
    getRequestController() {
        return this.__request__.controller;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestAction
     *
     * @description
     * Get request action
     * @return {String}
     */
    getRequestAction() {
        return this.__request__.action;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestId
     *
     * @description
     * Returns request id
     * @return {String}
     */
    getRequestId() {
        return this.__request__.id;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getFiltersToApply
     * @private
     * @description
     * This is used by framework internally
     */
    getFiltersToApply() {
        return this.__filters__.filter(item => {
            return (
                item.route === '*' ||
                item.route === this.getRequestRoute() ||
                item.route === this.getRequestController() + '/*'
            );
        }).sort((a, b) => {
            if (a.priority > b.priority) {
                return -1;
            } else if (a.priority < b.priority) {
                return 1;
            }
            return 0;
        });
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#applyBeforeEachFilters
     * @private
     * @description
     * ApplyBeforeEachFilters
     * This is used by framework internally
     */
    applyBeforeEachFilters() {
        let filters = this.getFiltersToApply();
        return di.async(function* beforeFilter() {
            let action;
            for (let filter of filters) {
                action = yield filter.beforeEach(action);
            }
            return action;
        });
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#applyBeforeEachFilters
     * @private
     * @description
     * apply filters in order
     * This is used by framework internally
     */
    applyAfterEachFilters(action) {
        let filters = this.getFiltersToApply();
        return di.async(function* afterFilter() {
            for (let filter of filters) {
                action = yield filter.afterEach(action);
            }
            return action;
        });
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#addFilter
     * @param {Filter} FilterToInitialize class to instantiate
     * @param {Number} priority
     * @param {String} route
     * @description
     * Add filter
     * @example
     *  class MyAppController extends Controller {
     *
     *    constructor(api) {
     *       super(api, {
     *          name: Type.STRING
     *       });
     *       this.name = 'We must define type if we want to have extended object with new members';
     *       this.addFilter(F1, 10);
     *       this.addFilter(F2, 10);
     *       this.addFilter(F3, 10, 'home/index'); // will be executed only on home controller action index
     *       this.addFilter(F3, 10, 'home/*'); // will be executed on all home controllers actions
     *    }
     *
     *  }
     */
    addFilter(FilterToInitialize, priority, route) {
        if (!Type.isNumber(priority)) {
            throw new error.HttpException(500, `Filter priority must be number type or defined ${priority}`);
        }
        let filter = new FilterToInitialize(this.__request__.bootstrap, {
            controller: this,
            priority: priority,
            route: route || '*'
        });
        if (!(filter instanceof Filter)) {
            throw new error.HttpException(500, `Filter must be inherited from @{en}/filter`);
        }
        this.__filters__.push(filter);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#isChaining
     * @private
     * @description
     * Check if chain is enabled
     * This is used by framework internally
     */
    isChaining() {
        return this.__chaining__;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#stopChain
     *
     * @description
     * Stop chain of actions, use this when needed. You can use it as well in filters to
     * @example
     *  // route home/index
     *  class MyAppController extends Controller {
     *
     *    beforeEach() {
     *      if (
     *          // expression
     *      ) {
     *          this.stopChain();
     *      }
     *    }
     *    beforeIndex() {
     *        // this will never be executed since chain is stopped
     *    }
     *    actionIndex() {
     *       // this will never be executed since chain is stopped
     *    }
     *
     *  }
     */
    stopChain() {
        this.__chaining__ = false;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#beforeEach
     *
     * @description
     * before each request do some logic if needed
     */
    beforeEach() {
        return Promise.resolve(true);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#afterEach
     *
     * @description
     * after each request do some logic if needed
     */
    afterEach(action) {
        return Promise.resolve(action);
    }
}

module.exports = Controller;