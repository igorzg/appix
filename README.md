# Appix 1.0.0-alpha-01 [![Build Status](https://travis-ci.org/igorzg/easynode.svg?branch=master)](https://travis-ci.org/igorzg/easynode)
* Es6 Node.js framework dev version
* Lightweight application framework with dyependency injection and dynamic type checking for node js
* This application framework is improved version of mvcjs nodejs framework

## Features
1. Appix follow [reactive](http://www.reactivemanifesto.org/) design pattern. 
2. Catch all runtime/syntax errors
3. Has a dependency injection
4. Built on top of ES6

 
**Hello world example in appix**  
- **npm install appix**

- app/env.json 
```json
{
  "aliases": {
    "models": "@{appPath}/models",
    "views": "@{appPath}/views",
    "helpers": "@{appPath}/helpers"
  },
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
router.add([
 {
   url: '/',
   route: 'home/Index'
 },
 {
   url: '/favicon.ico',
   route: 'home/Favicon'
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
class App extends Controller {
    actionIndex() {
        return 'Hello world';
    }
}
module.exports = App;
```

- run node app/index.js
