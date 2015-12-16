'use strict';

let di = require('appix');
let Type = di.load('typed-js');

class Cache extends Type {

    constructor() {
        super({
            data: Type.OBJECT
        });
        this.data = new Map();
    }

    set(key, value) {
        this.data.set(key, value);
    }

    get(key) {
        return this.data.get(key);
    }
}

module.exports = Cache;
