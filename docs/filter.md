<a name="Filter"></a>

## Filter
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Filter](#Filter)
    * [new Filter(bootstrap, config, types)](#new_Filter_new)
    * [.beforeEach()](#Filter+beforeEach)
    * [.afterEach()](#Filter+afterEach)

<a name="new_Filter_new"></a>

### new Filter(bootstrap, config, types)
Controller filters. Filters are executed before and after controller process.
If you want to do etc. Http caching, Zipping output and similar stuff it's better to use filters.
Override beforeEach and afterEach function when needed


| Param | Type | Description |
| --- | --- | --- |
| bootstrap | <code>Bootstrap</code> | instance |
| config | <code>Object</code> | object |
| types | <code>Object</code> | extend current types while inheriting from filter |

**Example**  
```js
let di = require('appix');
let Filter = di.load('@{appix}/Filter');

class Http extends Filter{

     beforeEach() {
         let that = this;
         return di.async(function* gen() {
             let cache = yield cacheService.get('mykey');
             if (!!cache) {
                 that.stopChain();
                 return cache;
             }
             return false;
         });
     }

     afterEach(output) {
         cacheService.set('key', output);
         return output;
     }
}
```
<a name="Filter+beforeEach"></a>

### filter.beforeEach()
Apply on each action

**Kind**: instance method of <code>[Filter](#Filter)</code>  
**Since**: 1.0.0  
<a name="Filter+afterEach"></a>

### filter.afterEach()
Apply after each function

**Kind**: instance method of <code>[Filter](#Filter)</code>  
**Since**: 1.0.0  
