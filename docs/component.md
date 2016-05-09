<a name="Component"></a>

## Component
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  
<a name="new_Component_new"></a>

### new Component()
Each component must be extended from Component class.
This class is mostly used as interface

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
// logger.js
class Logger extends Component {

}
```
