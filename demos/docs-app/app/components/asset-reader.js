'use strict';

let di = require('appix');
let Component = di.load('@{appix}/component');
let fs = di.load('fs');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name AssetLoader
 * @constructor
 * @description
 * Asset loader is loading all files from disk and displaying to browser
 * @example
 *  // in env.js register component
 *  "asset-reader": {
 *      "filePath": "@{components}/asset-reader"
 *  }
 *  // add route
 *  {
 *    url: '/favicon.ico',
 *    route: 'app/Favicon'
 *  }
 *  // in controllers add action
 *  actionFavicon() {
 *    let assetLoader = this.getComponent('asset-reader');
 *    return assetLoader.load('favicon.ico');
 *  }
 */
class AssetLoader extends Component {

    /**
     * @since 1.0.0
     * @function
     * @name AssetLoader#load
     *
     * @description
     * load file from disk
     */
    load(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(di.normalize('@{assets}/' + file), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

    }
}

module.exports = AssetLoader;
