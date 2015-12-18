'use strict';

let di = require('appix');
let nunjucks = di.load('nunjucks');
let Component = di.load('@{appix}/component');
/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name ViewLoader
 * @constructor
 * @description
 * This is custom view loader class which is registered in system as component
 * In each component super must be provided in order to
 * @example
 *  "asset-reader": {
 *      "filePath": "@{components}/asset-reader"
 *  }
 */
class ViewLoader extends Component {

    renderFile(file, context) {
        return new Promise((resolve, reject) => {
            nunjucks.render(di.normalize('@{views}/' + file + '.twig'), context || {}, (err, data)  => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = ViewLoader;