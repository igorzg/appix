<a name="AssetLoader"></a>
## AssetLoader
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [AssetLoader](#AssetLoader)
  * [new AssetLoader()](#new_AssetLoader_new)
  * [.load()](#AssetLoader+load)

<a name="new_AssetLoader_new"></a>
### new AssetLoader()
Asset loader is loading all files from disk and displaying to browser

**Example**  
```js
// in env.js register component
 "asset-reader": {
     "filePath": "@{components}/asset-reader"
 }
 // add route
 {
   url: '/favicon.ico',
   route: 'app/Favicon'
 }
 // in controllers add action
 actionFavicon() {
   let assetLoader = this.getComponent('asset-reader');
   return assetLoader.load('favicon.ico');
 }
```
<a name="AssetLoader+load"></a>
### assetLoader.load()
load file from disk

**Kind**: instance method of <code>[AssetLoader](#AssetLoader)</code>  
**Since**: 1.0.0  
