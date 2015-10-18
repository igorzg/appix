'use strict';

describe('router rule', () => {
    let di = require('../');
    let logger = {
        info: function () {

        }
    };
    let app = {
        getComponent: function (key) {
            if (key === 'en/logger') {
                return logger;
            }
        }
    };
    let RouteRule = di.mock('@{en}/route-rule', {
        '@{en}/error': di.load('@{en}/error'),
        'typed-js': di.load('typed-js')
    });


    it('pattern check /can<any>one/<name:\\w+>/should<now:\\W+>do-it/<see:(\\w+)>-<nice:([a-zA-Z]+)>-now-<only:\\d+>-not/user/<id:\\d+>', () => {
        let rule = new RouteRule(app, {
            url: '/can<any>one/<name:\\w+>/should<now:\\W+>do-it/<see:(\\w+)>-<nice:([a-zA-Z]+)>-now-<only:\\d+>-not/user/<id:\\d+>',
            route: 'user/view'
        });

        let url = '/canbeone/igor/should#+do-it/whata-smile-now-2306-not/user/1412';
        let parsed = rule.parseRequest(url, 'GET');

        let paramsMap = new Map();
        let params = {
            any: 'be',
            name: 'igor',
            now: '#+',
            see: 'whata',
            nice: 'smile',
            only: '2306',
            id: '1412'
        };
        Object.keys(params).forEach(k => paramsMap.set(k, params[k]));
        expect(parsed).toEqual({
            pathname: '/canbeone/igor/should#+do-it/whata-smile-now-2306-not/user/1412',
            method: 'GET',
            query: paramsMap
        });

        let urlResult = rule.createUrl('user/view', paramsMap);
        expect(urlResult).toBe(url);

        let nmap = new Map(paramsMap);
        nmap.set('g', '1 und 1');
        urlResult = rule.createUrl('user/view', nmap);
        expect(urlResult).toBe(url + '?g=1%20und%201');

        parsed.query.delete('id');

        urlResult = rule.createUrl('user/view', new Map(parsed.query));
        expect(urlResult).toBe(false);

        parsed.query.set('id', 'MY TEST');
        urlResult = rule.createUrl('user/view', new Map(parsed.query));
        expect(urlResult).toBe(false);
    });

    it('getPattern', () => {

        var rule = new RouteRule(app, {
            url: '/can<any>one/<name:\\w+>/should<now:\\W+>do-it/<see:(\\w+)>-<nice:([a-zA-Z]+)>-now-<only:\\d+>-not/user/<id:\\d+>',
            route: 'user/view'
        });

        var a = rule.pattern.shift();
        var a1 = rule.pattern.shift();
        var a2 = rule.pattern.shift();
        var a3 = rule.pattern.shift();
        var a4 = rule.pattern.shift();
        var a5 = rule.pattern.shift();
        var a6 = rule.pattern.shift();
        expect(a.source).toBe('can([\\s\\S]+)one');
        expect(a.original).toBe('can<any>one');
        expect(a.pattern).toEqual(/can([\s\S]+)one/);

        expect(a1.source).toBe('(\\w+)');
        expect(a1.original).toBe('<name:\\w+>');
        expect(a1.pattern).toEqual(/(\w+)/);

        expect(a2.source).toBe('should(\\W+)do-it');
        expect(a2.original).toBe('should<now:\\W+>do-it');
        expect(a2.pattern).toEqual(/should(\W+)do-it/);

        expect(a3.source).toBe('(\\w+)-([a-zA-Z]+)-now-(\\d+)-not');
        expect(a3.original).toBe('<see:(\\w+)>-<nice:([a-zA-Z]+)>-now-<only:\\d+>-not');
        expect(a3.pattern).toEqual(/(\w+)-([a-zA-Z]+)-now-(\d+)-not/);

        expect(a4.source).toBe('user');
        expect(a4.original).toBe('user');
        expect(a4.pattern).toEqual(/user/);

        expect(a5.source).toBe('(\\d+)');
        expect(a5.original).toBe('<id:\\d+>');
        expect(a5.pattern).toEqual(/(\d+)/);

        expect(a6).toBe(undefined);
    });

    it('shouldInherit', () => {
        class DynamicRule extends RouteRule {
            parseRequest() {

            }
            createUrl() {

            }
        }

        var rule = new DynamicRule(app, {});
        expect(rule instanceof RouteRule).toBe(true);
    });
});