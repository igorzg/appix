
# Controller examples

- app/controllers/home.js
```js
'use strict';
let di = require('appix');
let Type = di.load('typed-js');
let Controller = di.load('@{appix}/controller');
// Controllers can be inherited as many levels as you need

class Home extends Controller {

    constructor(api) {
        super(api); // All ways pass the types in order to have possibility to add an controller member
        this.addFilter(F1, 10);
        this.addFilter(F2, -100);
    }
    actionFavicon() {
        this.setResponseHeader('Content-Type', 'image/png');
        return new Buffer('This is my favicon');
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
        logger.info('Logger works', {
            p1Data: p1Data,
            p2Data: p2Data
        });
        return 'WORKS '+ p1Data + p2Data;
    }
}

module.exports = Home;
```
