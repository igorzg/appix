'use strict';

let di = require('appix');
let Type = di.load('typed-js');
let nunjucks = di.load('nunjucks');

class ViewLoader extends Type {

    constructor(config, bootstrap) {
        super({});
    }

    renderFile(file, context) {
        return new Promise(function (resolve, reject) {
            nunjucks.render(di.normalize('@{views}/' + file + '.twig'), context || {}, function (err, data) {
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