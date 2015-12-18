'use strict';

let di = require('appix');
let Type = di.load('typed-js');
let nunjucks = di.load('nunjucks');

class ViewLoader extends Type {
    /**
     * @license Mit Licence 2015
     * @since 1.0.0
     * @name ViewLoader
     * @param {Object} config
     * @param {Object} bootstrap instance
     * @constructor
     * @description
     * This is custom view loader class which is registered in system as component
     * In each component super must be provided in order to
     * @example
     *  "asset-reader": {
     *      "filePath": "@{components}/asset-reader"
     *  }
     */
    constructor(config, bootstrap) {
        super({});
    }

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