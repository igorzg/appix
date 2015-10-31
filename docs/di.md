## Classes
<dl>
<dt><a href="#DI">DI</a></dt>
<dd></dd>
</dl>
## Functions
<dl>
<dt><a href="#async">async()</a></dt>
<dd><p>Write nice async functions</p>
</dd>
</dl>
<a name="DI"></a>
## DI
**Kind**: global class  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
**License**: Mit Licence 2015  

* [DI](#DI)
  * [new DI()](#new_DI_new)
  * [.uuid()](#DI+uuid)
  * [.setInstance(key, value)](#DI+setInstance)
  * [.getInstance(key)](#DI+getInstance)
  * [.mock(file, mocks)](#DI+mock)

<a name="new_DI_new"></a>
### new DI()
Extend di implementation

<a name="DI+uuid"></a>
### dI.uuid()
Generate universally unique identifier

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="DI+setInstance"></a>
### dI.setInstance(key, value)
Add instance of bootstraped version

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>Object</code> | 

<a name="DI+getInstance"></a>
### dI.getInstance(key)
Return bootstraped instance

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="DI+mock"></a>
### dI.mock(file, mocks)
Return module with mocked objects

**Kind**: instance method of <code>[DI](#DI)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| file | <code>String</code> | 
| mocks | <code>Object</code> | 

<a name="async"></a>
## async()
Write nice async functions

**Kind**: global function  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
