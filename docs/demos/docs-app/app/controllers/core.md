<a name="CoreController"></a>

## CoreController
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  
<a name="new_CoreController_new"></a>

### new CoreController()
All app controllers are inherited from core controller

**Example**  
```js
class CoreController extends Controller {
  constructor(api) {
     super(api);
      this.addFilter(HttpFilter, 10, '*');
      this.locals = {
          template: name => {
              return di.normalize('@{views}/' + name + '.twig');
          }
      };
  }
}
```
