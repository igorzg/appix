'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let Component = di.load('@{en}/component');

class Bootstrap extends Type {
    constructor(config) {
        super({
            listenPort: Type.NUMBER,
            listenHost: null,
            initialized: Type.BOOLEAN,
            component: Type.OBJECT
        });
        if (Type.isObject(config)) {
            config = {};
        }
        this.initialized = false;
        this.listenPort = config.listenPort || 9000;
        this.listenHost = config.listenHost;
    }
}

module.exports = Bootstrap;