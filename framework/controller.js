'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{appix}/error');
let Filter = di.load('@{appix}/filter');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name Controller
 * @param {Object} api limited request api
 * @param {Object} types
 * @constructor
 * @description
 * Controller is constructed on each request.
 * All application controllers should be inherited from controller class
 * @example
 *  let di = require('appix');
 *  let Controller = di.load('@{appix}/controller');
 *  let Filter = di.load('@{appix}/filter');
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
     * @name Controller#getComponent
     * @param {String} key name of component
     * @description
     * Return component instance which is singleton
     * @return {String}
     *
     * @example
     *  class MyAppController extends Controller {
     *
     *    beforeIndex() {
     *      return [
     *          this.getComponent('appix/logger'),
     *          Promise.resolve('some async operation'),
     *          Promise.resolve('some other async operations')
     *      ];
     *    }
     *
     *    actionIndex(logger, p1DataResolved, p2DataResolved) {
     *      logger.log('Logger works', {
     *          p1DataResolved: p1DataResolved,
     *          p2DataResolved: p2DataResolved
     *      })
     *      return 'WORKS '+ p1DataResolved + p2DataResolved; // result => WORKS some async operation some other async operations
     *    }
     *  }
     */
    getComponent(key) {
        return this.__request__.bootstrap.getComponent(key);
    }
    /**
     * @since 1.0.0
     * @function
     * @name Controller#getMethod
     *
     * @description
     * Return method
     * @return {String}
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let method = this.getMethod();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let params = this.getParams();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let url = this.getParsedUrl();
     *        let pathname = url.pathname;
     *        let protocol = url.protocol;
     *    }
     * }
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
     * @return {Buffer|Object}
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let body = this.getRequestBody();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let pathname = this.getPathname();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let domain = this.getRequestDomain();
     *    }
     * }
     */
    getRequestDomain() {
        return this.__request__.getRequestDomain();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestHeader
     * @param {String} name of header
     * @description
     * Get request header, by header name
     * @return {String}
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let cookies = this.getRequestHeader('Cookies');
     *    }
     * }
     */
    getRequestHeader(name) {
        return this.__request__.getRequestHeader(name);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestHeaders
     *
     * @description
     * Get request headers, key value pairs
     * @return {Object}
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let headers = this.getRequestHeaders();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let local_address = this.getRequestLocalAddress();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let local_port = this.getRequestLocalPort();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let remote_port = this.getRequestRemotePort();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let remote_port = this.getRequestRemotePort();
     *    }
     * }
     */
    getRequestRemotePort() {
        return this.__request__.getRequestRemotePort();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestCookies
     * @description
     * get all cookies
     * @return {Object}
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let cookies = this.getRequestCookies();
     *    }
     * }
     */
    getRequestCookies() {
        return this.__request__.getRequestCookies();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getRequestCookie
     * @param {String} name cookie
     * @description
     * get cookie value
     * @return {String}
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let user = this.getRequestCookie('user');
     *    }
     * }
     */
    getRequestCookie(name) {
        return this.__request__.getRequestCookie(name);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#onEnd
     * @param {Function} callback destroy callback
     * @description
     * On end is an happening on destroy event
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let mySharedService = this.getComponent('shared-service');
     *        this.onEnd(() => {
     *          mySharedService.delete(this.getRequestId());
     *        });
     *    }
     * }
     */
    onEnd(callback) {
        return this.__request__.onEnd(callback);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#forwardRoute
     * @param {String} route
     * @param {Object} params
     *
     * @description
     * forward url
     * @return {Promise}
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        if (/* expression *\/) {
     *          return this.forwardRoute('search/index', {query: 'term'});
     *        }
     *    }
     * }
     */
    forwardRoute(route, params) {
        this.stopChain();
        this.__request__.flagAsForwarder();
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        if (/* expression *\/) {
     *          return this.forwardUrl('/search?query=term');
     *        }
     *    }
     * }
     */
    forwardUrl(url) {
        this.stopChain();
        this.__request__.flagAsForwarder();
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let route = this.getRequestRoute();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let controller = this.getRequestController();
     *    }
     * }
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
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let action = this.getRequestAction();
     *    }
     * }
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
     * Returns uuid request id
     * @return {String}
     * @example
     * class Platform extends Controller {
     *    actionIndex() {
     *        let uuid = this.getRequestId();
     *    }
     * }
     */
    getRequestId() {
        return this.__request__.id;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Controller#getUserAgent
     *
     * @description
     * Get user agent
     * @return {String}
     * @example
     * class Platform extends Controller {
     *    beforeEach() {
     *        let ua = this.getUserAgent();
     *        if (/android/i.test(ua)) {
     *          return this.forwardRoute('platform/mobile', this.getParams());
     *        }
     *        return this.forwardRoute('platform/desktop', this.getParams());
     *    }
     * }
     * class Desktop extends Platform {
     *    actionIndex() {
     *
     *    }
     * }
     * class Mobile extends Platform {
     *    actionIndex() {
     *
     *    }
     * }
     */
    getUserAgent() {
        return this.getRequestHeader('User-Agent');
    }
    /**
     * @since 1.0.0
     * @function
     * @name Controller#setResponseStatusCode
     * @param {Number} num status code number
     * @description
     * Set status code which will be sent to client
     * @example
     * class Error extends Controller {
     *    actionHandler() {
     *        if (/* expression *\/) {
     *          this.setResponseStatusCode(504)
     *        }
     *    }
     * }
     */
    setResponseStatusCode(num) {
        this.__request__.setResponseStatusCode(num);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Controller#setResponseCookie
     * @param {String} key cookie name
     * @param {String} value cookie value
     * @param {String|Object|Number} expires expire date
     * @param {String} path cookie path
     * @param {String} domain cookie domain
     * @param {Boolean} isHttpOnly is http only
     * @description
     * Sets an cookie header
     * @example
     * class User extends Controller {
     *    actionLogin() {
     *        this.setResponseCookie('user', 'id-1', 30);
     *        this.setResponseCookie('user1', 'id-2', 50, '/');
     *        this.setResponseCookie('user2', 'id-3', 50, '/', '.igorivanovic.info');
     *        this.setResponseCookie('user2', 'id-3', 50, '/', '.igorivanovic.info', true);
     *    }
     * }
     */
    setResponseCookie(key, value, expires, path, domain, isHttpOnly) {
        this.__request__.setResponseCookie(key, value, expires, path, domain, isHttpOnly);
    }
    /**
     * @since 1.0.0
     * @function
     * @name Controller#setResponseHeader
     * @param {String} key header name
     * @param {String|Object} value header value
     * @description
     * Sets an response header
     * @example
     * class JSON extends Controller {
     *    afterEach(html) {
     *        if (!this.hasResponseHeader('Content-Type')) {
     *           this.setResponseHeader('Content-Type', 'application/json');
     *        }
     *    }
     * }
     */
    setResponseHeader(key, value) {
        this.__request__.setResponseHeader(key, value);
    }
    /**
     * @since 1.0.0
     * @function
     * @name Controller#hasResponseHeader
     * @param {String} key header name
     * @description
     * Check if response header is present
     * @return {Boolean}
     * @example
     * class JSON extends Controller {
     *    afterEach(html) {
     *        if (!this.hasResponseHeader('Content-Type')) {
     *           this.setResponseHeader('Content-Type', 'application/json');
     *        }
     *    }
     * }
     */
    hasResponseHeader(key) {
        return this.__request__.hasResponseHeader(key);
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
     * Add filter, all filters must be inherited from appix/filter
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
     *       this.addFilter(F4, 10, 'home/*'); // will be executed on all home controllers actions
     *       this.addFilter(F5, 10, '*'); // apply on all controllers actions
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
            throw new error.HttpException(500, `Filter must be inherited from @{appix}/filter`);
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
     * class MyAppController extends Controller {
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
     * }
     */
    stopChain() {
        this.__chaining__ = false;
    }
    /**
     * @since 1.0.0
     * @function
     * @name Controller#redirect
     * @param {String} url string url
     * @param {Number} code status code
     * @description
     * Redirect to page
     * @example
     * class User extends Controller {
     *    beforeEach() {
     *        if (!this.isLoggedIn) {
     *           return this.redirect(this.createUrl('user/login'))
     *        }
     *    }
     *    actionIndex() {
     *
     *    }
     * }
     */
    redirect(url, code) {
        this.stopChain();
        return this.__request__.redirect(url, code);
    }
    /**
     * @since 1.0.0
     * @function
     * @name Controller#beforeEach
     *
     * @description
     * before each request do some logic if needed
     * @example
     * class User extends Controller {
     *    beforeEach() {
     *        if (!this.isLoggedIn) {
     *           return this.redirect(this.createUrl('user/login'))
     *        }
     *    }
     * }
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
     * @example
     * class User extends Controller {
     *    afterEach(html) {
     *        if (this.getMethod() === 'GET') {
     *          let cache = this.getComponent('mycache');
     *          cache.set(this.getPathname(), html);
     *        }
     *        return html;
     *    }
     * }
     */
    afterEach(action) {
        return Promise.resolve(action);
    }
}

module.exports = Controller;