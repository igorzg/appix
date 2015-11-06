'use strict';

describe('filter', () => {
    let di = require('../');
    let Filter = di.mock('@{appix}/filter', {
        'typed-js': di.load('typed-js')
    });
    let logger = {
        info() {
        }
    };
    let filter;
    let controller = {};
    beforeEach(() => {
        let bootstrap = {
            getComponent() {
                return logger;
            }
        };
        filter = new Filter(bootstrap, {
            controller,
            priority: 100,
            route: 'home/*'
        });
    });

    it('beforeEach', (done) => {
        filter.beforeEach()
            .then(r => {
                expect(r).toBe(true);
            })
            .catch(fail)
            .then(done);
    });

    it('afterEach', (done) => {
        let o = {};
        filter.afterEach(o)
            .then(r => {
                expect(r).toBe(o);
            })
            .catch(fail)
            .then(done);
    });
});