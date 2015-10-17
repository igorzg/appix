'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let EventEmitter = di.load('events');
let URLParser = di.load('url');
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
            parsedUrl: Type.OBJECT
        });
        this.logger = bootstrap.getComponent('en/logger');
        this.router = bootstrap.getComponent('en/router');
        this.response = config.response;
        this.request = config.request;
        this.id = di.uuid();
        this.url = url;
        this.parsedUrl = URLParser.parse(this.url, true);
        this.events = new EventEmitter();
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Request#getRequestHeaders
     *
     * @description
     * Return request headers
     */
    getRequestHeaders() {
        return Object.assign({}, this.request.headers);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Request#getRequestDomain
     *
     * @description
     * Return request domain
     */
    getRequestDomain() {
        return this.request.connection.domain;
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Request#getRequestIpAddres
     *
     * @description
     * Request remote ip address
     */
    getRequestRemoteAddress() {
        return this.request.connection.remoteAddress;
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Request#getRequestRemotePort
     *
     * @description
     * Request remote port
     */
    getRequestRemotePort() {
        return this.request.connection.remotePort;
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Request#getRequestLocalAddress
     *
     * @description
     * Request locals address
     */
    getRequestLocalAddress() {
        return this.request.connection.localAddress;
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Request#getRequestLocalPort
     *
     * @description
     * Request local port
     */
    getRequestLocalPort() {
        return this.request.connection.localPort;
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Request#onEnd
     *
     * @description
     * On end process destroy event
     */
    onEnd(callback) {
        this.events.once('destory', callback);
    }

    /**
     * @since 0.0.1
     * @author Igor Ivanovic
     * @method Request#process
     *
     * @description
     * Process request
     */
    process() {
        // destroy on end
        this.response.once('finish', () => this.events.emit('destory'));
        // destroy if connection was terminated before end
        this.response.once('close', () => this.events.emit('destory'));

    }
}

module.exports = Request;