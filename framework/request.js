'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let EventEmitter = di.load('events');
let URLParser = di.load('url');
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
            events: Type.OBJECT
        });
        logger = bootstrap.getComponent('en/logger');
        router = bootstrap.getComponent('en/router');
        this.response = config.response;
        this.request = config.request;
        this.id = di.uuid();
        this.url = url;
        this.parsedUrl = URLParser.parse(this.url, true);
        this.data = [];
        this.events = new EventEmitter();
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
        return new Map(this.parsedUrl.query);
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
                    path: this.getPathname(),
                    method: this.getMethod()
                });
                return router.parseRequest(this.getPathname(), this.getMethod());
            })
            .then(route => {
                console.log('route', route);

                this.request.end(JSON.stringify(route));
            })
            .catch(error => {
                console.log('instanceof', error.toString());
                this.response.write(error.toString());
                this.response.end();
            });
    }
}

module.exports = Request;