'use strict';
let di = require('../../');
let Bootstrap = di.load('@{appix}/bootstrap');
// bootstrap application
let easyInit = new Bootstrap({
    listenPort: 9500,
    appPath:  __dirname + '/'
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
        route: 'app/Forward',
        dataEvent: true
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
        route: 'app/Favicon'
    }
]);

easyInit.listen();

