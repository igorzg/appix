'use strict';

let di = require('di-node');
let Type = di.load('typed-js');

// Bootstrap component
let Component = di.load('@{en}/component');
di.setModule('en/component', new Component());

class Bootstrap extends Type {
    constructor(config) {
        super({

        });

    }
}

module.exports = Bootstrap;