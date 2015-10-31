<a name="Logger"></a>
## Logger
**Kind**: global class  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
**License**: Mit Licence 2015  

* [Logger](#Logger)
  * [new Logger()](#new_Logger_new)
  * [.trace()](#Logger+trace)
  * [.info()](#Logger+info)
  * [.debug()](#Logger+debug)
  * [.warn()](#Logger+warn)
  * [.error()](#Logger+error)
  * [.fatal()](#Logger+fatal)
  * [.getLevelName()](#Logger+getLevelName)
  * [.log()](#Logger+log)
  * [.addHook(callback)](#Logger+addHook)
  * [.clean()](#Logger+clean) ⇒ <code>String</code>
  * [.inspect()](#Logger+inspect)

<a name="new_Logger_new"></a>
### new Logger()
Logger handler for easy node

<a name="Logger+trace"></a>
### logger.trace()
Trace

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+info"></a>
### logger.info()
Log info case

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+debug"></a>
### logger.debug()
Debug

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+warn"></a>
### logger.warn()
Log warn case

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+error"></a>
### logger.error()
Log error case

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+fatal"></a>
### logger.fatal()
Fatal error

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+getLevelName"></a>
### logger.getLevelName()
Get level name

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+log"></a>
### logger.log()
Write to file and exec hooks

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+addHook"></a>
### logger.addHook(callback)
Add hook to log output so developer can extend where to store log

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Logger+clean"></a>
### logger.clean() ⇒ <code>String</code>
Clean message for write

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Returns**: <code>String</code> - message  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Logger+inspect"></a>
### logger.inspect()
Inspect log data output

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
