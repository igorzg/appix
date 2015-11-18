'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let EventEmitter = di.load('events');
let URLParser = di.load('url');
let error = di.load('@{appix}/error');
let core = di.load('@{appix}/core');
let Controller = di.load('@{appix}/controller');
let COOKIE_PARSE_REGEX = /(\w+[^=]+)=([^;]+)/g;
let logger;
let router;

/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @class
 * @name Request
 * @param {Bootstrap} bootstrap instance
 * @param {Object} request config
 * @param {String} url
 * @constructor
 * @description
 * This class is responsible for processing request
 */
class Request extends Type {
    constructor(bootstrap, config, url) {
        super({
            request: Type.OBJECT,
            response: Type.OBJECT,
            logger: Type.OBJECT,
            router: Type.OBJECT,
            url: Type.STRING,
            parsedUrl: Type.OBJECT,
            data: Type.ARRAY,
            id: Type.STRING,
            events: Type.OBJECT,
            params: Type.OBJECT,
            bootstrap: Type.OBJECT,
            isCustomError: Type.BOOLEAN,
            isForwarded: Type.BOOLEAN,
            isRedirected: Type.BOOLEAN,
            statusCode: Type.NUMBER,
            requestCookies: Type.OBJECT,
            responseHeaders: Type.OBJECT
        });
        logger = bootstrap.getComponent('appix/logger');
        router = bootstrap.getComponent('appix/router');
        this.bootstrap = bootstrap;
        this.response = config.response;
        this.request = config.request;
        this.params = config.params || {};
        this.isCustomError = config.isCustomError || false;
        this.isForwarded = config.isForwarded || false;
        this.isRedirected = false;
        this.id = di.uuid();
        this.url = url;
        this.parsedUrl = URLParser.parse(this.url, true);
        this.data = Type.isArray(config.data) ? config.data : [];
        this.events = new EventEmitter();
        this.statusCode = 200;
        this.responseHeaders = {};
        this.requestCookies = config.requestCookies || {};

        if (!this.isForwarded) {
            let cookies = this.getRequestHeader('Cookie');
            if (Type.isString(cookies)) {
                cookies.replace(
                    COOKIE_PARSE_REGEX,
                    (cookie, key, value) => this.requestCookies[key] = value
                );
            }
        }
    }
    /**
     * @since 1.0.0
     * @function
     * @name Request#destroy
     * @private
     * @description
     * Destroy all references to free memory
     * @return {String}
     */
    destroy() {
        this.events.emit('destroy');
        this.events.removeAllListeners();
        super.destroy()
    }
    /**
     * @since 1.0.0
     * @function
     * @name Request#toString
     * @param {Boolean} noClean
     * @private
     * @description
     * To string representation
     * @return {String}
     */
    toString(noClean) {
        if (!!noClean) {
            return core.inspect(this);
        }
        return core.clean(core.inspect(this));
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getParsedUrl
     *
     * @description
     * Return parsed url
     * @return {Object}
     */
    getParsedUrl() {
        return Object.assign({}, this.parsedUrl);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getMethod
     *
     * @description
     * Get request method
     * @return {String}
     */
    getMethod() {
        return this.request.method;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getPathname
     *
     * @description
     * Return request pathname
     * @return {String}
     */
    getPathname() {
        return this.parsedUrl.pathname;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getParams
     *
     * @description
     * Return request url query
     * @return {Map}
     */
    getParams() {
        return new Map(Object.assign({}, this.parsedUrl.query, this.params));
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestHeader
     * @param {String} name header name
     *
     * @description
     * Get an request header by header name
     */
    getRequestHeader(name) {
        if (!Type.isString(name)) {
            throw new error.HttpException(500, `Request header name must be string type`);
        }
        let keys = Object.keys(this.request.headers);
        let value = '';
        while (keys.length) {
            let key = keys.shift();
            if (name.toLocaleLowerCase() === key.toLocaleLowerCase()) {
                value = this.request.headers[key];
                break;
            }
        }
        return value;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestHeaders
     *
     * @description
     * Return request headers
     * @return {Object}
     */
    getRequestHeaders() {
        return Object.assign({}, this.request.headers);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestDomain
     *
     * @description
     * Return request domain
     * @return {String}
     */
    getRequestDomain() {
        return this.request.connection.domain;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestRemoteAddress
     *
     * @description
     * Request remote ip address
     * @return {String}
     */
    getRequestRemoteAddress() {
        return this.request.connection.remoteAddress;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestRemotePort
     *
     * @description
     * Request remote port
     * @return {Number}
     */
    getRequestRemotePort() {
        return this.request.connection.remotePort;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestLocalAddress
     *
     * @description
     * Request locals address
     * @return {String}
     */
    getRequestLocalAddress() {
        return this.request.connection.localAddress;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestLocalPort
     *
     * @description
     * Request local port
     * @return {Number}
     */
    getRequestLocalPort() {
        return this.request.connection.localPort;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#onEnd
     *
     * @description
     * Add custom events on destroy event
     */
    onEnd(callback) {
        this.events.once('destroy', callback);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestBody
     *
     * @description
     * Return request body
     * @return {Buffer}
     */
    getRequestBody() {
        return Buffer.concat(this.data);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#hasResponseHeader
     * @param {String} key header name
     * @description
     * Check if response header is present
     * @return {Boolean}
     */
    hasResponseHeader(key) {
        if (Type.isString(key)) {
            key = key.toLocaleLowerCase();
        } else {
            throw new error.HttpException(500, `Response header key must be string type`);
        }
        return this.responseHeaders.hasOwnProperty(key);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestCookie
     * @param {String} name cookie
     * @description
     * Return cookie value
     */
    getRequestCookie(name) {
        return this.requestCookies[name];
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#getRequestCookies
     * @description
     * Return all cookies
     */
    getRequestCookies() {
        return this.requestCookies;
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @function
     * @name Request#setResponseCookie
     * @param {String} key cookie name
     * @param {String} value cookie value
     * @param {String|Object|Number} expires expire date
     * @param {String} path cookie path
     * @param {String} domain cookie domain
     * @param {Boolean} isHttpOnly is http only
     * @description
     * Sets an cookie header
     */
    setResponseCookie(key, value, expires, path, domain, isHttpOnly) {
        var cookie, date;

        if (Type.isUndefined(key) || Type.isUndefined(value)) {
            throw new error.HttpException(500, 'Request.setResponseCookie: key and value must be provided!', {
                key,
                value,
                expires,
                path,
                domain,
                isHttpOnly
            });
        }
        cookie = key + '=' + value;
        if (!!expires) {
            if (Type.isNumber(expires)) {
                date = new Date();
                date.setTime(date.getTime() + expires);
                cookie += '; Expires=' + date.toGMTString();
            } else if (Type.isString(expires)) {
                cookie += '; Expires=' + expires;
            } else if (Type.isDate(expires)) {
                cookie += '; Expires=' + expires.toGMTString();
            }
        }
        if (!!path) {
            cookie += '; Path=' + path;
        }
        if (!!domain) {
            cookie += '; Domain=' + domain;
        }
        if (!!isHttpOnly) {
            cookie += '; HttpOnly';
        }
        this.setResponseHeader('Set-cookie', cookie);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#setResponseHeader
     * @param {String} key header name
     * @param {String|Object} value header value
     * @description
     * Sets an response header
     */
    setResponseHeader(key, value) {
        if (Type.isString(key)) {
            key = key.toLocaleLowerCase();
        } else {
            throw new error.HttpException(500, `Response header key must be string type ${key}`);
        }

        if (!value) {
            throw new error.HttpException(500, `Response header value must be defined ${value}`);
        }

        value = value.toString();

        if (this.hasResponseHeader(key) && !Type.isArray(this.responseHeaders[key])) {
            let header = this.responseHeaders[key];
            this.responseHeaders[key] = [];
            this.responseHeaders[key].push(header);
            this.responseHeaders[key].push(value);
        } else if (this.hasResponseHeader(key) && Type.isArray(this.responseHeaders[key])) {
            this.responseHeaders[key].push(value);
        } else {
            this.responseHeaders[key] = value;
        }
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#setResponseStatusCode
     * @param {Number} num status code number
     * @description
     * Set status code which will be sent to client
     */
    setResponseStatusCode(num) {
        if (!Type.isNumber(num)) {
            num = parseInt(num);
        }
        if (isNaN(num)) {
            throw new error.HttpException(500, 'Status code must be number', {
                num
            });
        }
        this.statusCode = num;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#render
     * @param {Buffer|String} response
     * @private
     * @description
     * This method sends data to client
     */
    render(response) {
        let rKey = 'Content-Type';
        if (!this.hasResponseHeader(rKey)) {
            this.setResponseHeader(rKey, 'text/html');
        }
        logger.info('Request.render', {
            id: this.id,
            statusCode: this.statusCode,
            headers: this.responseHeaders
        });
        if (Type.isString(response) || (response instanceof Buffer)) {
            this.response.writeHead(this.statusCode, this.responseHeaders);
            this.response.write(response);
            this.response.end();
            return true;
        }
        logger.error('Invalid response type', {
            id: this.id,
            response: response,
            type: typeof response
        });
        throw new error.HttpException(500, 'ResponseType must be string or buffer', {
            response
        });
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#forward
     * @param {String} url
     * @param {Object} config
     * @private
     * @description
     * Forward to new request, this is doing server side forwarding
     */
    forward(url, config) {
        if (url === this.url) {
            throw new error.HttpException(500, 'Cannot be forwarded to same url', {
                url,
                config
            });
        }
        let nRequest = new Request(this.bootstrap, Object.assign({
            request: this.request,
            response: this.response,
            requestCookies: this.requestCookies,
            isForwarded: true,
            data: this.data
        }, config), url);
        let process = nRequest.process();
        nRequest.request.emit('end');
        return process;
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#forwardRoute
     * @param {String} route
     * @param {Object} params
     *
     * @description
     * Forward route
     */
    forwardRoute(route, params) {
        let that = this;
        return di.async(function* forwardRouteGen() {
            var item = yield router.createUrl(route, params);
            return that.forward(item);
        });
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#forwardUrl
     * @param {String} url
     *
     * @description
     * Forward url
     */
    forwardUrl(url) {
        return this.forward(url);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#redirect
     * @param {String} url string url
     * @param {Number} code status code default is 302 temporary redirect!
     * @description
     * Redirect to page
     */
    redirect(url, code) {
        this.isRedirected = true;
        this.setResponseStatusCode(code || 302);
        this.setResponseHeader('Location', url);
        return Promise.resolve(`Redirect to: ${code} - ${url}`);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#handleModule
     * @param {String} moduleName
     * @param {String} controllerName
     * @param {String} actionName
     * @private
     * @description
     * Handle module, currently not implemented, will be within next versions.
     */
    handleModule(moduleName, controllerName, actionName) {
        throw new error.HttpException(500, `Modules are not implemented in current version :)`, {
            moduleName,
            controllerName,
            actionName
        });
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#handleController
     * @param {String} controllerName
     * @param {String} actionName
     * @private
     * @description
     * Load controller and create it's instance
     * @return {Promise}
     */
    handleController(controllerName, actionName) {
        var request = this;
        let ControllerToInitialize = di.load('@{controllersPath}/' + controllerName);
        let controller = new ControllerToInitialize({
            getMethod: this.getMethod.bind(this),
            getParams: this.getParams.bind(this),
            getParsedUrl: this.getParsedUrl.bind(this),
            getRequestBody: this.getRequestBody.bind(this),
            getPathname: this.getPathname.bind(this),
            getRequestDomain: this.getRequestDomain.bind(this),
            getRequestHeaders: this.getRequestHeaders.bind(this),
            getRequestLocalAddress: this.getRequestLocalAddress.bind(this),
            getRequestLocalPort: this.getRequestLocalPort.bind(this),
            getRequestRemoteAddress: this.getRequestRemoteAddress.bind(this),
            getRequestRemotePort: this.getRequestRemotePort.bind(this),
            getRequestHeader: this.getRequestHeader.bind(this),
            getRequestCookie: this.getRequestCookie.bind(this),
            getRequestCookies: this.getRequestCookies.bind(this),
            setResponseStatusCode: this.getRequestHeader.bind(this),
            setResponseCookie: this.setResponseCookie.bind(this),
            setResponseHeader: this.setResponseHeader.bind(this),
            hasResponseHeader: this.hasResponseHeader.bind(this),
            redirect: this.redirect.bind(this),
            onEnd: this.onEnd.bind(this),
            forwardRoute: this.forwardRoute.bind(this),
            forwardUrl: this.forwardUrl.bind(this),
            id: this.id,
            bootstrap: this.bootstrap,
            controller: controllerName,
            action: actionName,
            route: controllerName + '/' + actionName
        });

        if (!(controller instanceof Controller)) {
            throw new error.HttpException(500, `${controllerName} must be inherited from @{appix}/controller`, {
                controllerName,
                actionName
            });
        }

        return di.async(function* resolve() {
            let beforeKey = 'before' + actionName;
            let afterKey = 'after' + actionName;
            let actionKey = 'action' + actionName;
            let action;

            action = yield controller.applyBeforeEachFilters();

            if (controller.isChaining()) {
                if (Type.isArray(action)) {
                    action = yield Promise.all(action);
                    action = yield controller.beforeEach.apply(controller, action);
                } else {
                    action = yield controller.beforeEach(action);
                }
            }
            if (Type.isFunction(controller[beforeKey]) && controller.isChaining()) {
                if (Type.isArray(action)) {
                    action = yield Promise.all(action);
                    action = yield controller[beforeKey].apply(controller, action);
                } else {
                    action = yield controller[beforeKey](action);
                }
            }
            if (controller.isChaining()) {
                if (Type.isFunction(controller[actionKey])) {
                    if (Type.isArray(action)) {
                        action = yield Promise.all(action);
                        action = yield controller[actionKey].apply(controller, action);
                    } else {
                        action = yield controller[actionKey](action);
                    }
                } else {
                    throw new error.HttpException(500,
                        `Action ${actionName} is not defined in controller ${controllerName}`,
                        {
                            controllerName,
                            actionName
                        }
                    );
                }
            }
            if (Type.isFunction(controller[afterKey]) && controller.isChaining()) {
                if (Type.isArray(action)) {
                    action = yield Promise.all(action);
                    action = yield controller[afterKey].apply(controller, action);
                } else {
                    action = yield controller[afterKey](action);
                }
            }
            if (controller.isChaining()) {
                if (Type.isArray(action)) {
                    action = yield Promise.all(action);
                    action = yield controller.afterEach.apply(controller, action);
                } else {
                    action = yield controller.afterEach(action);
                }
            }
            // on redirection don't apply filters

            if (!request.isRedirected) {
                if (Type.isArray(action)) {
                    action = yield Promise.all(action);
                    return yield controller.applyAfterEachFilters.apply(controller, action);
                } else {
                    return yield controller.applyAfterEachFilters(action);
                }
            }
            return action;
        }).then(item => this.render(item));
    }

    /**
     * @since 1.0.0
     * @function
     * @name Request#process
     * @private
     * @description
     * Process request, assign destroy event.
     * Process data if there is an data.
     * @return {Promise}
     */
    process() {
        // destroy on end
        if (!this.isForwarded) {

            this.response.once('finish', () => this.destroy());
            // destroy if connection was terminated before end
            this.response.once('close', () => this.destroy());
            // push data
            this.request.on('data', item => this.data.push(item));
        }
        // on data end process request
        return new Promise(resolve => this.request.on('end', resolve))
            .then(() => {
                logger.info('Route.parseRequest', {
                    id: this.id,
                    path: this.getPathname(),
                    method: this.getMethod()
                });
                return router.parseRequest(this.getPathname(), this.getMethod(), this.getRequestHeaders());
            })
            .then(result => {

                logger.info('Route.result', {
                    id: this.id,
                    result
                });

                let route = result.route.split('/');

                if (route.length === 2) {
                    return this.handleController.apply(this, route);
                } else if (route.length === 3) {
                    return this.handleModule.apply(this, route);
                }

                throw new error.HttpException(500, `Route definition is invalid, route must contain controller/action
                    or module/controller/action pattern
                `, {
                    result
                });
            })
            .catch(error => {
                logger.error(error.message, {
                    id: this.id,
                    url: this.url,
                    request: this.getParsedUrl(),
                    method: this.getMethod(),
                    error
                });
                if (router.useCustomErrorHandler && !this.isCustomError) {
                    return this.forward(router.error.url, {
                        params: {
                            error: error
                        },
                        isCustomError: true
                    });
                }
                return this.render(error.stack);
            })
            .catch(error => this.render(error.stack))
            .catch(error => logger.error('Error in parsing error response', {
                id: this.id,
                url: this.url,
                request: this.getParsedUrl(),
                method: this.getMethod(),
                error
            }))
    }
}

module.exports = Request;