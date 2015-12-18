<a name="HttpFilter"></a>
## HttpFilter
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  
<a name="new_HttpFilter_new"></a>
### new HttpFilter()
Apply filter to some requests

**Example**  
```js
class HttpFilter extends Filter {
   beforeEach() {
     let cache = this.controller.getComponent('cache');
     let cached = cache.get(this.controller.getRequestCacheKey());
     if (!!cached) {
         this.controller.stopChain();
         return cached;
     }
     return false;
  }

  afterEach(data) {
      let cache = this.controller.getComponent('cache');
      let logger = this.controller.getComponent('appix/logger');
      let key = this.controller.getRequestCacheKey();
      logger.info('Set.cache', {key: key});
      cache.set(key, data);
      return data;
  }
}
```
