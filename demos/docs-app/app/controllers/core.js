'use strict';

let di = require('appix');
let Controller = di.load('@{appix}/controller');
let HttpFilter = di.load('@{filters}/http');

class Core extends Controller {

    constructor(api) {
        super(api);
        this.addFilter(HttpFilter, 10, '*');
    }

    getRequestCacheKey() {
        return this.getPathname() + this.getMethod() + JSON.stringify(this.getParams());
    }
}

module.exports = Core;
