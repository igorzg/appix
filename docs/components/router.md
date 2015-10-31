<a name="Router"></a>
## Router
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Router](#Router)
  * [new Router(config, bootstrap)](#new_Router_new)
  * [.add(Rule)](#Router+add)
  * [.parseRequest(pathName, method, headers)](#Router+parseRequest)
  * [.createUrl(routeName, params)](#Router+createUrl)

<a name="new_Router_new"></a>
### new Router(config, bootstrap)
Router is a component in easy node application.
Router handles routing for application.


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> |  |
| bootstrap | <code>Bootstrap</code> | instance |

<a name="Router+add"></a>
### router.add(Rule)
Add route to resolve list.
To add custom rule you must inherit from RouteRule class.
All rules must be instanceof RouteRule.
If you add array or object it will be converted to RouteRule.

**Kind**: instance method of <code>[Router](#Router)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| Rule | <code>RouteRule</code> &#124; <code>Object</code> &#124; <code>Array</code> &#124; <code>function</code> | 

<a name="Router+parseRequest"></a>
### router.parseRequest(pathName, method, headers)
Parse request based on pathName and method

**Kind**: instance method of <code>[Router](#Router)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| pathName | <code>String</code> | 
| method | <code>String</code> | 
| headers | <code>Object</code> | 

<a name="Router+createUrl"></a>
### router.createUrl(routeName, params)
Create url based on route and params

**Kind**: instance method of <code>[Router](#Router)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| routeName | <code>String</code> | 
| params | <code>Object</code> | 

