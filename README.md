# Appix 1.0.0-alpha-01 [![Build Status](https://travis-ci.org/igorzg/easynode.svg?branch=master)](https://travis-ci.org/igorzg/easynode)
* Es6 Node.js framework dev version
* Lightweight application framework with dyependency injection and dynamic type checking for node js
* This application framework is improved version of mvcjs nodejs framework

**Hello world in appix**  

1. app/env.json
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

2. app/index.js
```js
'use strict';
let di = require('appix');
let Bootstrap = di.load('@{appix}/bootstrap');
// bootstrap application
let init = new Bootstrap({
  listenPort: 9000,
  appPath:  __dirname + '/'
});
di.setInstance('node', init);
let router = init.getComponent('appix/router');
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
init.listen();
```

3. app/controllers/home.js
```js
let di = require('appix');
let Controller = di.load('@{appix}/controller');
class App extends Controller {
    actionIndex() {
        return 'Hello world';
    }
}
module.exports = App;
```


