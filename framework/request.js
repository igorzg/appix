'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let EventEmitter = di.load('events');
let URLParser = di.load('url');
let error = di.load('@{en}/error');
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
        this.id = config.id || di.uuid();
        this.url = url;
        this.parsedUrl = URLParser.parse(this.url, true);
        this.data = Type.isArray(config.data) ? config.data : [];
        this.events = new EventEmitter();
        this.statusCode = 200;
        this.responseHeaders = {};
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
     * @name Request#getRequestIpAddres
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
            response: this.response,
            data: this.data
        }, config), url);
        nRequest.onEnd(nRequest.destroy.bind(nRequest));
        let process = nRequest.process();
        nRequest.request.emit('end');
        return process;
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
        this.response.once('finish', () => this.events.emit('destory'));
        // destroy if connection was terminated before end
        this.response.once('close', () => this.events.emit('destory'));
        // push data
        this.request.on('data', item => this.data.push(item));
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
            .then(route => {
                logger.info('Route.result', {
                    id: this.id,
                    route
                });
                this.render(route.pathname);
            })
            .catch(error => {
                logger.error(error.message, {
                    id: this.id,
                    error
                });
                if (router.useCustomErrorHandler && !this.isCustomError) {
                    return this.forward(router.error.url, {
                        id: this.id,
                        params: {
                            error: error
                        },
                        isCustomError: true
                    });
                }
                return this.render(error.toString());
            })
            .catch(error => this.render(error.toString()));
    }
}

module.exports = Request;