<a name="Bootstrap"></a>
## Bootstrap
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Bootstrap](#Bootstrap)
  * [new Bootstrap(appConfig, callback)](#new_Bootstrap_new)
  * [.listen()](#Bootstrap+listen)
  * [.setComponent(key, config)](#Bootstrap+setComponent)
  * [.hasComponent(key)](#Bootstrap+hasComponent)
  * [.getComponent(key)](#Bootstrap+getComponent)

<a name="new_Bootstrap_new"></a>
### new Bootstrap(appConfig, callback)
Use Bootstrap class to bootstrap an application.
It could be with server listen but it could be server side simulation to.


| Param | Type |
| --- | --- |
| appConfig | <code>Object</code> | 
| callback | <code>function</code> | 

**Example**  
```js
'use strict';
   let di = require('appix');
   let Bootstrap = di.load('@{appix}/bootstrap');
   // bootstrap application
   let easyInit = new Bootstrap({
      listenPort: 9500,
      appPath:  __dirname + '/app'
   }, function dynamicComponentConfig(components) {
      components.set('my-component', {});
   });

   di.setInstance('en-demo', easyInit);

   let router = easyInit.getComponent('appix/router');

   router.add([
     {
       url: '/',
       route: 'app/Index'
     },
     {
       url: '/favicon.ico',
       route: 'home/Favicon'
     }
   ]);

   easyInit.listen();
```
<a name="Bootstrap+listen"></a>
### bootstrap.listen()
Listen server

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Since**: 1.0.0  
<a name="Bootstrap+setComponent"></a>
### bootstrap.setComponent(key, config)
Set component

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> |  |
| config | <code>Object</code> | of component |

<a name="Bootstrap+hasComponent"></a>
### bootstrap.hasComponent(key)
Check if has component

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="Bootstrap+getComponent"></a>
### bootstrap.getComponent(key)
Get component

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

