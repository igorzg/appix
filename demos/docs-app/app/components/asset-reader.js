'use strict';

let di = require('appix');
let Type = di.load('typed-js');
let fs = di.load('fs');

class AssetLoader extends Type {

    constructor() {
        super({});
    }

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