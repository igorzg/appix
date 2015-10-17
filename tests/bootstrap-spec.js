'use strict';

describe('bootstrap', () => {
    let di = require('../');
    let fs = {};
    let path = {};
    let Bootstrap = di.mock('@{en}/bootstrap', {
        '@{en}/component': Map,
        'fs': fs,
        'path': path,
        '@{en}/error': di.load('@{en}/error'),
        'typed-js': di.load('typed-js')
    });
    let bootstrap;
    beforeEach(() =>  {
        bootstrap = new Bootstrap({});
    });
    it('construct', () => {
        bootstrap = new Bootstrap({});
        expect(bootstrap.components).toEqual(new Map);
    });

    it('bootstrap', () => {
        bootstrap = new Bootstrap({});

    });

    it('setComponent', () => {
        var ctx = {
            components: {
                set:  () => {}
            }
        };
        spyOn(ctx.components, 'set').and.callThrough();
        bootstrap.setComponent.call(ctx, 'key', 'val');
        expect(ctx.components.set).toHaveBeenCalledWith('key', 'val');
    });

    it('getComponent', () => {
        var ctx = {
            components: {
                get: () => {}
            },
            hasComponent: () => true
        };
        spyOn(ctx.components, 'get').and.callThrough();
        bootstrap.getComponent.call(ctx, 'key');
        expect(ctx.components.get).toHaveBeenCalledWith('key');
    });

});