'use strict';
let di = require('../../');
let Bootstrap = di.load('@{appix}/bootstrap');
// bootstrap application
let easyInit = new Bootstrap({
    listenPort: 9500,
    appPath:  __dirname + '/'
}, function dynamicComponentConfig(components) {
    //components.set('key', {});
});

di.setInstance('en-demo', easyInit);

let router = easyInit.getComponent('appix/router');

router.add([
    {
        url: '/',
        route: 'app/Index'
    },
    {
        url: '/forward',
        route: 'app/Forward'
    },
    {
        url: '/test',
        route: 'app/Test'
    },
    {
        url: '/test-pall',
        route: 'app/TestPall'
    },
    {
        url: '/goto301',
        route: 'app/Redirect301'
    },
    {
        url: '/goto',
        route: 'app/Redirect'
    },
    {
        url: '/favicon.ico',
        route: 'home/myfaviconhandler'
    }
]);

easyInit.listen();

