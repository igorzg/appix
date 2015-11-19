# Appix 1.0.0-alpha-03 [![Build Status](https://travis-ci.org/igorzg/appix.svg?branch=master)](https://travis-ci.org/igorzg/appix)
* Es6 Node.js framework dev version
* Lightweight application framework with dyependency injection and dynamic type checking for node js
* This application framework is improved version of mvcjs nodejs framework

## Features
1. Appix follow [reactive](http://www.reactivemanifesto.org/) design pattern. 
2. Catch all runtime/syntax errors
3. Has a dependency injection
4. Built on top of ES6


[Documentation wiki](https://github.com/igorzg/appix/wiki)
 
**Hello world example in appix**  
- **npm install appix**

- app/env.json 
```json
{
  "components": {
    "appix/logger": {
      "enabled": true,
      "console": true,
      "level": 30
    },
    "appix/router": {
      "useCustomErrorHandler": false
    }
  }
}
```

- app/index.js 
```js
'use strict';
let di = require('appix');
let Bootstrap = di.load('@{appix}/bootstrap');
// bootstrap application
let init = new Bootstrap({
  listenPort: 9000,
  appPath:  __dirname + '/'
});
// set bootstrapped instance under custom name
di.setInstance('node', init);
// get router component
let router = init.getComponent('appix/router');
// add some routes
// Route actions are case sensitive!
router.add([
    {
        url: '/',
        route: 'home/Index'
    },
    {
        url: '/goto301',
        route: 'home/Redirect301'
    },
    {
        url: '/goto',
        route: 'home/Redirect'
    },
    {
        url: '/favicon.ico',
        route: 'home/myfaviconhandler'
    }
]);
// run server
init.listen();
```

- app/controllers/home.js 
```js
'use strict';
let di = require('appix');
let Controller = di.load('@{appix}/controller');
// Controllers can be inherited as many levels as you need
class Home extends Controller {

   actionRedirect() {
       return this.redirect('/', 302);
   }

   actionRedirect301() {
       return this.redirect('/', 301);
   }

   actionIndex() {
       return 'Hello world';
   }
}
module.exports = Home;
```

- run node app/index.js
- open localhost:9000
