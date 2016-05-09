<a name="Cache"></a>

## Cache
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Cache](#Cache)
    * [new Cache()](#new_Cache_new)
    * [.constructor()](#Cache+constructor)
    * [.set()](#Cache+set)
    * [.get()](#Cache+get)

<a name="new_Cache_new"></a>

### new Cache()
This is an example of cache class

**Example**  
```js
"cache": {
     "filePath": "@{components}/memory-cache"
 }
```
<a name="Cache+constructor"></a>

### cache.constructor()
This is how you extend your component types

**Kind**: instance method of <code>[Cache](#Cache)</code>  
**Since**: 1.0.0  
**Example**  
```js
constructor(config, bootstrap) {
  super(config, bootstrap);
  this.data = new Map();
}
```
<a name="Cache+set"></a>

### cache.set()
Set cache in memory

**Kind**: instance method of <code>[Cache](#Cache)</code>  
**Since**: 1.0.0  
<a name="Cache+get"></a>

### cache.get()
Get cache from memory

**Kind**: instance method of <code>[Cache](#Cache)</code>  
**Since**: 1.0.0  
