'use strict';

let di = require('appix');
let Bootstrap = di.load('@{appix}/bootstrap');

// bootstrap application
let initialize = new Bootstrap({
    listenPort: 9500,
    appPath: __dirname + '/app/',
    envPath: __dirname + '/'
});

di.setInstance('docs-app', initialize);

let router = initialize.getComponent('appix/router');

// add routes
router.add([
    {
        url: '/',
        route: 'app/Index'
    },
    {
        url: '/favicon.ico',
        route: 'app/Favicon'
    }
]);

// run server
initialize.listen();