'use strict';

let di = require('appix');
let Component = di.load('@{appix}/component');
let fs = di.load('fs');

class AssetLoader extends Component {

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