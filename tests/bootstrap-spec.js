'use strict';

describe('bootstrap', () => {
    let di = require('../');
    let Bootstrap = di.mock('@{en}/bootstrap', {
        '@{en}/component': Map,
        'typed-js': di.load('typed-js')
    });
    let bootstrap;
    beforeEach(function () {
        bootstrap = new Bootstrap({});
    });
    it('construct', () => {
        bootstrap = new Bootstrap({});
        expect(bootstrap.listenPort).toEqual(9000);
        expect(bootstrap.listenHost).toEqual(undefined);
        expect(bootstrap.component).toEqual(new Map);
        bootstrap = new Bootstrap({
            listenPort: 8000,
            listenHost: 'localhost'
        });
        expect(bootstrap.listenPort).toEqual(8000);
        expect(bootstrap.listenHost).toEqual('localhost');
    });

    it('setComponent', () => {
        var ctx = {
            component: {
                set: function () {}
            }
        };
        spyOn(ctx.component, 'set').and.callThrough();
        bootstrap.setComponent.call(ctx, 'key', 'val');
        expect(ctx.component.set).toHaveBeenCalledWith('key', 'val');
    });

    it('getComponent', () => {
        var ctx = {
            component: {
                get: function () {}
            }
        };
        spyOn(ctx.component, 'get').and.callThrough();
        bootstrap.getComponent.call(ctx, 'key');
        expect(ctx.component.get).toHaveBeenCalledWith('key');
    });


});