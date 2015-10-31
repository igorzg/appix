'use strict';

let di = require('../../../');
let key = 'en-demo';
let logger = di.getInstance(key).getComponent('appix/logger');
let Controller = di.load('@{appix}/controller');
let Filter = di.load('@{appix}/filter');
class F1 extends Filter {
    afterEach(data) {

        return data + ' ' + new Date;
    }
}

class F2 extends Filter {
    afterEach(data) {
        return di.async(function* gen() {
            return yield data + ' prio';
        });
    }
}


class App extends Controller {

    constructor(api) {
        super(api);
        this.addFilter(F1, 10);
        this.addFilter(F2, -100);
    }

    actionIndex() {
        return 'WORKS';
    }
}

module.exports = App;