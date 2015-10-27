'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let logger;

class Controller extends Type {
    constructor(api, types) {
        super(Object.assign({
            __api__: Type.OBJECT
        }, types));
        this.__api__ = api;
    }
}

module.exports = Controller;