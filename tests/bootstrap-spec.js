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
    it('bootstrap', () => {
        expect(bootstrap.component).toEqual(new Map);
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