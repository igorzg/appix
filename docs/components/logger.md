<a name="Logger"></a>

## Logger
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Logger](#Logger)
    * [new Logger()](#new_Logger_new)
    * [.trace()](#Logger+trace)
    * [.info()](#Logger+info)
    * [.debug()](#Logger+debug)
    * [.warn()](#Logger+warn)
    * [.error()](#Logger+error)
    * [.fatal()](#Logger+fatal)
    * [.addHook(callback)](#Logger+addHook)
    * [.clean(message)](#Logger+clean) ⇒ <code>String</code>
    * [.inspect(data, level)](#Logger+inspect)

<a name="new_Logger_new"></a>

### new Logger()
Logger is a component in easy node application.
Logger handler for easy node, there a various type of logs
[INFO, TRACE, DEBUG, WARN, ERROR, FATAL]
By default only ERROR and FATAL are enabled in production mode.
Logger in system is delivered as component

**Example**  
```js
// env.json
{
 "components": {
    "appix/logger": {
      "enabled": true,
      "console": true,
      "level": 30
    }
 }
}
class User extends Controller {
   beforeEach() {
     let logger = this.getComponent('appix/logger');
     logger.info('My message', {});
     logger.error('My message', {});
     logger.warn('My message', {});
     logger.trace('My message', {});
     logger.fatal('My message', {});
     logger.debug('My message', {});
   }
}
```
<a name="Logger+trace"></a>

### logger.trace()
Trace

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
<a name="Logger+info"></a>

### logger.info()
Log info case

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
<a name="Logger+debug"></a>

### logger.debug()
Debug

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
<a name="Logger+warn"></a>

### logger.warn()
Log warn case

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
<a name="Logger+error"></a>

### logger.error()
Log error case

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
<a name="Logger+fatal"></a>

### logger.fatal()
Fatal error

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
<a name="Logger+addHook"></a>

### logger.addHook(callback)
Add hook to log output so developer can extend where to store log

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Logger+clean"></a>

### logger.clean(message) ⇒ <code>String</code>
Clean inspect message

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Returns**: <code>String</code> - message  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| message | <code>String</code> | 

<a name="Logger+inspect"></a>

### logger.inspect(data, level)
Inspect log data output

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| data | <code>Object</code> | 
| level | <code>Number</code> | 

