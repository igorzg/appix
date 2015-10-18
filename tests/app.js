'use strict';
let di = require('../');
let Bootstrap = di.load('@{en}/bootstrap');
// bootstrap application
di.setInstance('en-demo', new Bootstrap({
    listenPort: 9500,
    appPath:  __dirname + '/app'
}));