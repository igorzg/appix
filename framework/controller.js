'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let logger;

class Controller extends Type {
    constructor(api, types) {
        super(Object.assign({
            __request__: Type.OBJECT,
            __chaining__: Type.BOOLEAN
        }, types));
        this.__chaining__ = true;
        this.__request__ = api;
    }

    isChaining() {
        return this.__chaining__;
    }

    stopChain() {
        this.__chaining__ = false;
    }

    beforeEach() {
        return Promise.resolve(true);
    }

    afterEach(action) {
        return Promise.resolve(action);
    }
}

module.exports = Controller;