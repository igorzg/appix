<a name="Router"></a>
## Router
**Kind**: global class  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
**License**: Mit Licence 2015  

* [Router](#Router)
  * [new Router()](#new_Router_new)
  * [.add(Rule)](#Router+add)
  * [.parseRequest(pathName, method, headers)](#Router+parseRequest)
  * [.createUrl(routeName, params)](#Router+createUrl)

<a name="new_Router_new"></a>
### new Router()
Router handler for easy node

<a name="Router+add"></a>
### router.add(Rule)
Add route to resolve list

**Kind**: instance method of <code>[Router](#Router)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| Rule | <code>Object</code> &#124; <code>Array</code> &#124; <code>function</code> | 

<a name="Router+parseRequest"></a>
### router.parseRequest(pathName, method, headers)
Parse request based on pathName and method

**Kind**: instance method of <code>[Router](#Router)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

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
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| routeName | <code>String</code> | 
| params | <code>Object</code> | 

