'use strict';
let di = require('../');
let Bootstrap = di.load('@{en}/bootstrap');
// bootstrap application
let easyInit = new Bootstrap({
    listenPort: 9500,
    appPath:  __dirname + '/app'
}, function dynamicComponentConfig(components) {
    //components.set('key', {});
});

di.setInstance('en-demo', easyInit);

let router = easyInit.getComponent('en/router');

router.add([
    {
        url: '/',
        route: 'app/Index'
    },
    {
        url: '/favicon.ico',
        route: 'home/myfaviconhandler'
    }
]);

easyInit.listen();

