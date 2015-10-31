'use strict';

describe('server', () => {
    let di = require('../');
    let server = {
        on: () => {
        },
        listen: () => {
        },
        close: () => {
        },
        setTimeout: () => {
        }
    };
    let httpMock = {
        createServer: () => server
    };
    let Server = di.mock('@{appix}/components/server', {
        'http': httpMock,
        'typed-js': di.load('typed-js')
    });
    let http;

    beforeEach(() => {
        http = new Server({});
    });

    it('on', () => {
        spyOn(server, 'on').and.callThrough();
        http.on();
        expect(server.on).toHaveBeenCalled();
    });

    it('listen', () => {
        spyOn(server, 'listen').and.callThrough();
        http.listen();
        expect(server.listen).toHaveBeenCalled();
    });

    it('close', () => {
        spyOn(server, 'close').and.callThrough();
        http.close();
        expect(server.close).toHaveBeenCalled();
    });

    it('setTimeout', () => {
        spyOn(server, 'setTimeout').and.callThrough();
        http.setTimeout();
        expect(server.setTimeout).toHaveBeenCalled();
    });

});