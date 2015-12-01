<a name="RouteRule"></a>
## RouteRule
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [RouteRule](#RouteRule)
  * [new RouteRule(bootstrap, config, types)](#new_RouteRule_new)
  * [.getPattern(url)](#RouteRule+getPattern)
  * [.parseRequest(pathname, method)](#RouteRule+parseRequest) ⇒ <code>Object</code>
  * [.createUrl(route, params)](#RouteRule+createUrl)

<a name="new_RouteRule_new"></a>
### new RouteRule(bootstrap, config, types)
Route rule is used to add route definitions to router.
To enable data event dataEvent property has to be passed to router as dataEvent: true


| Param | Type | Description |
| --- | --- | --- |
| bootstrap | <code>Bootstrap</code> | instance |
| config | <code>Object</code> |  |
| types | <code>Object</code> | to extend route rule on inherit while implementing custom parseRequest and createUrl |

**Example**  
```js
class DynamicRule extends RouteRule {
  parseRequest(pathname, method) {
     let query = {};
     let route = 'user/contact';
     return {
            pathname,
            method,
            query,
            dataEvent: true,
            route
        }
  }
  createUrl() {

  }
}

// during bootstrap process add dynamic route rule
let router = bootstrap.getComponent('appix/router');
router.add(DynamicRule);
// add static routes
router.add([
   {
       url: '/',
       route: 'app/Index',
       dataEvent: true
   },
   {
       url: '/favicon.ico',
       route: 'app/Favicon'
   }
]);
```
<a name="RouteRule+getPattern"></a>
### routeRule.getPattern(url)
Creates pattern based on url provided

**Kind**: instance method of <code>[RouteRule](#RouteRule)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

<a name="RouteRule+parseRequest"></a>
### routeRule.parseRequest(pathname, method) ⇒ <code>Object</code>
Parse request and get result
When route rule is extend following object structure has to be returned

**Kind**: instance method of <code>[RouteRule](#RouteRule)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| pathname | <code>String</code> | 
| method | <code>String</code> | 

**Example**  
```js
parseRequest(pathname, method) {
 return {
   pathname,
   method,
   query,
   dataEvent: true,
   route
 }
}
```
<a name="RouteRule+createUrl"></a>
### routeRule.createUrl(route, params)
Create url based on parameters and route

**Kind**: instance method of <code>[RouteRule](#RouteRule)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| route | <code>String</code> | 
| params | <code>Map</code> | 

