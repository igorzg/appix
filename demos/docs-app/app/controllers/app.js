'use strict';

let di = require('appix');
let CoreController = di.load('@{controllersPath}/core');

class App extends CoreController {


    beforeIndex() {
        return Promise.resolve({
            body: 'showed using Appix and custom templating engine',
            title: 'Appix demo app',
            template: function (name) {
                return di.normalize('@{views}/'+ name + '.twig');
            }
        });
    }

    actionIndex(data) {
        let view = this.getComponent('view');
        return view.renderFile('home/index', data);
    }

    actionFavicon() {
        let assetLoader = this.getComponent('asset-reader');
        return assetLoader.load('favicon.ico');
    }
}

module.exports = App;