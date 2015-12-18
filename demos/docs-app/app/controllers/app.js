'use strict';

let di = require('appix');
let CoreController = di.load('@{controllersPath}/core');

/**
 * @license Mit Licence 2015
 * @since 1.0.0
 * @name AppController
 * @constructor
 * @description
 * App controller extends core controller
 * @example
 * class AppController extends CoreController {
 *
 * }
 */
class AppController extends CoreController {
    /**
     * @since 1.0.0
     * @function
     * @name AppController#beforeIndex
     *
     * @description
     * Example of preparing some data
     */
    beforeIndex() {
        return Promise.resolve({
            body: 'showed using Appix and custom templating engine',
            title: 'Appix demo app',
            template: name => {
                return di.normalize('@{views}/' + name + '.twig');
            }
        });
    }
    /**
     * @since 1.0.0
     * @function
     * @name AppController#actionIndex
     *
     * @description
     * Load component view and render data
     */
    actionIndex(data) {
        let view = this.getComponent('view');
        return view.renderFile('home/index', data);
    }
    /**
     * @since 1.0.0
     * @function
     * @name AppController#actionFavicon
     *
     * @description
     * Display favicon
     */
    actionFavicon() {
        let assetLoader = this.getComponent('asset-reader');
        return assetLoader.load('favicon.ico');
    }
}

module.exports = AppController;
