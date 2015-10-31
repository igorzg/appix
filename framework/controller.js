'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let Filter = di.load('@{en}/filter');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name Controller
 *
 * @constructor
 * @description
 * This class is responsible for processing application actions
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
     * @author Igor Ivanovic
     * @function
     * @name Controller#getMethod
     *
     * @description
     * Return method
     */
    getMethod() {
        return this.__request__.getMethod();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getParams
     *
     * @description
     * Return params
     */
    getParams() {
        return this.__request__.getParams();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getParsedUrl
     *
     * @description
     * Return parsed url
     */
    getParsedUrl() {
        return this.__request__.getParsedUrl();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestBody
     *
     * @description
     * Get request body, return data sent to server.
     */
    getRequestBody() {
        return this.__request__.getRequestBody();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getPathname
     *
     * @description
     * Get request pathname
     */
    getPathname() {
        return this.__request__.getPathname();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestDomain
     *
     * @description
     * Get request domain
     */
    getRequestDomain() {
        return this.__request__.getRequestDomain();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestHeaders
     *
     * @description
     * Get request headers
     */
    getRequestHeaders() {
        return this.__request__.getRequestHeaders();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestLocalAddress
     *
     * @description
     * Get request local address
     */
    getRequestLocalAddress() {
        return this.__request__.getRequestLocalAddress();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestLocalPort
     *
     * @description
     * Get request local port
     */
    getRequestLocalPort() {
        return this.__request__.getRequestLocalPort();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestRemoteAddress
     *
     * @description
     * Get request remote address
     */
    getRequestRemoteAddress() {
        return this.__request__.getRequestRemoteAddress();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestRemotePort
     *
     * @description
     * Get request remote port
     */
    getRequestRemotePort() {
        return this.__request__.getRequestRemotePort();
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
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
     * @author Igor Ivanovic
     * @function
     * @name Controller#forwardUrl
     * @param {String} route
     * @param {Object} params
     *
     * @description
     * forward url
     */
    forwardRoute(route, params) {
        return this.__request__.forwardRoute(route, params);
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#forwardUrl
     * @param {String} url
     *
     * @description
     * forward url
     */
    forwardUrl(url) {
        return this.__request__.forwardUrl(url);
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestRoute
     *
     * @description
     * Get request route
     */
    getRequestRoute() {
        return this.__request__.route;
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestController
     *
     * @description
     * Get request controller
     */
    getRequestController() {
        return this.__request__.controller;
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestAction
     *
     * @description
     * Get request action
     */
    getRequestAction() {
        return this.__request__.action;
    }
    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getRequestId
     *
     * @description
     * Returns request id
     */
    getRequestId() {
        return this.__request__.id;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#getFiltersToApply
     *
     * @description
     * Get filters which should be applyd on current request
     */
    getFiltersToApply() {
        return this.__filters__.filter(item => {
            return item.route === '*' || item.route === this.__request__.route;
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
     * @author Igor Ivanovic
     * @function
     * @name Controller#applyBeforeEachFilters
     *
     * @description
     * ApplyBeforeEachFilters
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
     * @author Igor Ivanovic
     * @function
     * @name Controller#applyBeforeEachFilters
     *
     * @description
     * apply filters in order
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
     * @author Igor Ivanovic
     * @function
     * @name Controller#addFilter
     *
     * @description
     * Add filter
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
     * @author Igor Ivanovic
     * @function
     * @name Controller#isChaining
     *
     * @description
     * Check if chain is enabled
     */
    isChaining() {
        return this.__chaining__;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Controller#stopChain
     *
     * @description
     * Stop chain of actions
     */
    stopChain() {
        this.__chaining__ = false;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
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
     * @author Igor Ivanovic
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