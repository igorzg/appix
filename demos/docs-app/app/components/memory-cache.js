'use strict';

let di = require('appix');
let Component = di.load('@{appix}/component');
let Type = di.load('typed-js');

class Cache extends Component {

    constructor(config, bootstrap) {
        super(config, bootstrap, {
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
