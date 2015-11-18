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

    actionRedirect() {
        return this.redirect('/', 302);
    }

    actionRedirect301() {
        return this.redirect('/', 301);
    }

    beforeForward() {
        return this.forwardRoute('app/Index');
    }
    actionForward() {
        return 'ACTION FORWARD CHAIN MUST BE STOPPED';
    }

    afterForward() {
        return 'AFTER ACTION FORWARD CHAIN MUST BE STOPPED';
    }

    beforeIndex() {
        return Promise.resolve(1);
    }

    actionIndex(data) {
        return 'Hello world ' + data;
    }

    beforeTestPall() {
        return Promise.all([
            this.getComponent('appix/logger'),
            Promise.resolve('some async operation '),
            Promise.resolve('some other async operations ')
        ]);
    }

    actionTestPall(logger, p1Data, p2Data) {
        logger.fatal('Logger works', {
            p1Data: p1Data,
            p2Data: p2Data
        })
        return 'WORKS '+ p1Data + p2Data;
    }

    beforeTest() {
        return [
            this.getComponent('appix/logger'),
            Promise.resolve('some async operation '),
            Promise.resolve('some other async operations ')
        ];
    }

    actionTest(logger, p1Data, p2Data) {
        logger.fatal('Logger works', {
            p1Data: p1Data,
            p2Data: p2Data
        })
        return 'WORKS '+ p1Data + p2Data;
    }
}

module.exports = App;