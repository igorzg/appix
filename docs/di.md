<a name="DI"></a>
## DI
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [DI](#DI)
  * [.uuid()](#DI+uuid) ⇒ <code>String</code>
  * [.async(genFunc)](#DI+async) ⇒ <code>Promise</code>
  * [.setInstance(key, value)](#DI+setInstance)
  * [.getInstance(key)](#DI+getInstance)
  * [.mock(file, mocks)](#DI+mock)

<a name="DI+uuid"></a>
### dI.uuid() ⇒ <code>String</code>
Generate universally unique identifier

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  
**Example**  
```js
let di = require('appix');
di.uuid();
```
<a name="DI+async"></a>
### dI.async(genFunc) ⇒ <code>Promise</code>
Use di.async to write easier async functions

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| genFunc | <code>function</code> | generator |

**Example**  
```js
let di = require('appix');
di.async(function* gen() {
     let one = yield asyncFunc();
     let two = yield asyncFunc2(one);
     let three = yield asyncFunc3(two);
     return three;
});
```
<a name="DI+setInstance"></a>
### dI.setInstance(key, value)
Add instance of bootstraped version

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>Object</code> | 

<a name="DI+getInstance"></a>
### dI.getInstance(key)
Return bootstraped instance

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="DI+mock"></a>
### dI.mock(file, mocks)
Return module with mocked objects

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| file | <code>String</code> | 
| mocks | <code>Object</code> | 

