'use strict';

let di = require('appix');
let Type = di.load('typed-js');
let fs = di.load('fs');

class AssetLoader extends Type {

    constructor() {
        super({});
    }

    load(file) {
        return new Promise(function (resolve, reject) {
            fs.readFile(di.normalize('@{assets}/' + file), function (err, data) {
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