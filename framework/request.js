'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let EventEmitter = di.load('events');
let URLParser = di.load('url');
let error = di.load('@{en}/error');
let core = di.load('@{en}/core');
let Controller = di.load('@{en}/controller');
let logger;
let router;

/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @author Igor Ivanovic
 * @name Request
 *
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
            statusCode: Type.NUMBER,
            responseHeaders: Type.OBJECT
        });
        logger = bootstrap.getComponent('en/logger');
        router = bootstrap.getComponent('en/router');
        this.bootstrap = bootstrap;
        this.response = config.response;
        this.request = config.request;
        this.params = config.params || {};
        this.isCustomError = config.isCustomError || false;
        this.isForwarded = config.isForwarded || false;
        this.id = config.id || di.uuid();
        this.url = url;
        this.parsedUrl = URLParser.parse(this.url, true);
        this.data = Type.isArray(config.data) ? config.data : [];
        this.events = config.events || new EventEmitter();
        this.statusCode = 200;
        this.responseHeaders = {};
        this.response.on('destory', () => {
            this.events.emit('destory');
            this.events.removeAllListeners();
            this.destroy();
        });
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#toString
     * @param {Boolean} noClean
     *
     * @description
     * To string representation
     */
    toString(noClean) {
        if (!!noClean) {
            return core.inspect(this);
        }
        return core.clean(core.inspect(this));
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getParsedUrl
     *
     * @description
     * Return parsed url
     */
    getParsedUrl() {
        return Object.assign({}, this.parsedUrl);
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getMethod
     *
     * @description
     * Return method
     */
    getMethod() {
        return this.request.method;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getPathname
     *
     * @description
     * Return request pathname
     */
    getPathname() {
        return this.parsedUrl.pathname;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getParams
     *
     * @description
     * Return request url query
     */
    getParams() {
        return new Map(Object.assign({}, this.parsedUrl.query, this.params));
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getRequestHeaders
     *
     * @description
     * Return request headers
     */
    getRequestHeaders() {
        return Object.assign({}, this.request.headers);
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getRequestDomain
     *
     * @description
     * Return request domain
     */
    getRequestDomain() {
        return this.request.connection.domain;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getRequestRemoteAddress
     *
     * @description
     * Request remote ip address
     */
    getRequestRemoteAddress() {
        return this.request.connection.remoteAddress;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getRequestRemotePort
     *
     * @description
     * Request remote port
     */
    getRequestRemotePort() {
        return this.request.connection.remotePort;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getRequestLocalAddress
     *
     * @description
     * Request locals address
     */
    getRequestLocalAddress() {
        return this.request.connection.localAddress;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getRequestLocalPort
     *
     * @description
     * Request local port
     */
    getRequestLocalPort() {
        return this.request.connection.localPort;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#onEnd
     *
     * @description
     * On end process destroy event
     */
    onEnd(callback) {
        this.events.once('destory', callback);
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#getRequestBody
     *
     * @description
     * Return request body
     */
    getRequestBody() {
        return Buffer.concat(this.data);
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#render
     *
     * @description
     * Render data
     */
    render(response) {
        let rKey = 'content-type';
        if (!this.responseHeaders.hasOwnProperty(rKey)) {
            this.responseHeaders[rKey] = 'text/html';
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
     * @author Igor Ivanovic
     * @function
     * @name Request#forward
     *
     * @description
     * Forward to new request
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
            id: this.id,
            response: this.response,
            isForwarded: true,
            events: this.events,
            data: this.data
        }, config), url);
        let process = nRequest.process();
        nRequest.request.emit('end');
        return process;
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
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
     * @author Igor Ivanovic
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
     * @author Igor Ivanovic
     * @function
     * @name Request#handleModule
     * @param {String} moduleName
     * @param {String} controllerName
     * @param {String} actionName
     *
     * @description
     * Handle module
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
     * @author Igor Ivanovic
     * @function
     * @name Request#handleController
     * @param {String} controllerName
     * @param {String} actionName
     *
     * @description
     * Handle controller
     */
    handleController(controllerName, actionName) {

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
            throw new error.HttpException(500, `${controllerName} must be inherited from @{en}/controller`, {
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
                action = yield controller.beforeEach(action);
            }
            if (Type.isFunction(controller[beforeKey]) && controller.isChaining()) {
                action = yield controller[beforeKey](action);
            }
            if (controller.isChaining()) {
                if (Type.isFunction(controller[actionKey])) {
                    action = yield controller[actionKey](action);
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
                action = yield controller[afterKey](action);
            }
            if (controller.isChaining()) {
                action = yield controller.afterEach(action);
            }

            return yield controller.applyAfterEachFilters(action);
        }).then(item => this.render(item));
    }

    /**
     * @since 1.0.0
     * @author Igor Ivanovic
     * @function
     * @name Request#process
     *
     * @description
     * Process request
     */
    process() {
        // destroy on end
        if (!this.isForwarded) {
            this.response.once('finish', () => this.response.emit('destory'));
            // destroy if connection was terminated before end
            this.response.once('close', () => this.response.emit('destory'));
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
            .catch(error => this.render(error.stack));
    }
}

module.exports = Request;