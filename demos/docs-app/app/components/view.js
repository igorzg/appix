'use strict';

let di = require('appix');
let Type = di.load('typed-js');
let nunjucks = di.load('nunjucks');

class ViewLoader extends Type {

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