'use strict';

let di = require('../di');
let Type = di.load('typed-js');
let http = di.load('http');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name Server
 *
 * @constructor
 * @description
 * Server is a component in easy node application.
 * Server class is responsible for publishing server by default that is http server.
 * This is an mock over http service so we can provide custom one.
 * If we want to use https, socket or similar we provide custom Server service.
 */
class Server extends Type {
    constructor() {
        super({
            server: Type.OBJECT
        });
        this.server = http.createServer();
    }

    /**
     * @since 1.0.0
     * @function
     * @name Server#on
     *
     * @description
     * Server on event
     */
    on() {
        this.server.on.apply(this.server, arguments);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Server#listen
     *
     * @description
     * listen server
     */
    listen() {
        this.server.listen.apply(this.server, arguments);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Server#close
     *
     * @description
     * Close server connection
     */
    close() {
        this.server.close.apply(this.server, arguments);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Server#setTimeout
     *
     * @description
     * http://nodejs.org/api/http.html#http_server_settimeout_msecs_callback
     */
    setTimeout() {
        this.server.setTimeout.apply(this.server, arguments);
    }

    /**
     * @since 1.0.0
     * @function
     * @name Server#startUp
     *
     * @description
     * Startup server based on bootstrap process
     */
    startUp(bootstrap) {
        let Request = di.load('@{appix}/request');
        this.on('request', (request, response) => {
            di.setAlias('controllersPath', bootstrap.defaults.controllersPath);
            di.setAlias('modulesPath', bootstrap.defaults.modulesPath);
            let nRequest = new Request(bootstrap, {
                request,
                response
            }, request.url);
            nRequest.process();
        });
        if (Type.isString(bootstrap.defaults.listenHost)) {
            this.listen(bootstrap.defaults.listenPort, bootstrap.defaults.listenHost);
        } else {
            this.listen(bootstrap.defaults.listenPort);
        }
    }

}

module.exports = Server;