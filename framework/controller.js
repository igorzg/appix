'use strict';

let di = require('./di');
let Type = di.load('typed-js');
let error = di.load('@{en}/error');
let logger;

class Controller extends Type {
    constructor(api, types) {
        super(Object.assign({
            request: Type.OBJECT
        }, types));
        this.request = api;
    }

    beforeEach() {
        return Promise.resolve(true);
    }

    afterEach(action) {
        return Promise.resolve(action);
    }
}

module.exports = Controller;