'use strict';

let di = require('../../../');
let key = 'en-demo';
let logger = di.getInstance(key).getComponent('en/logger');
let Controller = di.load('@{en}/controller');
class App extends Controller {

    actionIndex() {
        return 'WORKS';
    }
}

module.exports = App;