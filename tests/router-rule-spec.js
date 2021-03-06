'use strict';

describe('router rule', () => {
    let di = require('../');
    let logger = {
        info: function () {

        }
    };
    let app = {
        getComponent: function (key) {
            if (key === 'appix/logger') {
                return logger;
            }
        }
    };
    let RouteRule = di.mock('@{appix}/route-rule', {
        '@{appix}/error': di.load('@{appix}/error'),
        '@{appix}/core': di.load('@{appix}/core'),
        'typed-js': di.load('typed-js')
    });

    it('pattern check /', () => {
        let rule = new RouteRule(app, {
            url: '/',
            route: 'home/index'
        });
        let url = '/';
        let q;
        let parsed;
        let urlResult;

        parsed = rule.parseRequest(url, 'GET');
        expect(parsed.route).toBe('home/index');
        q = parsed.query;
        urlResult = rule.createUrl('home/index', q);
        expect(urlResult).toBe(url);
    });

    it('pattern check /assets/css/*', () => {
        let rule = new RouteRule(app, {
            url: '/assets/<file:(.*)>',
            route: 'assets/file'
        });
        let url = '/assets/css/style.css';
        let parsed = rule.parseRequest(url, 'GET');
        expect(parsed.query.file).toBe('css/style.css');
        let q = parsed.query;
        let urlResult = rule.createUrl('assets/file', q);
        expect(urlResult).toBe(url);

        url = '/assets/js/test/app.js';
        parsed = rule.parseRequest(url, 'GET');
        expect(parsed.query.file).toBe('js/test/app.js');

        q = parsed.query;
        urlResult = rule.createUrl('assets/file', q);
        expect(urlResult).toBe(url);

        rule = new RouteRule(app, {
            url: '/assets/<file:([^\\/]+)>',
            route: 'assets/file'
        });

        url = '/assets/js/test/app.js';
        parsed = rule.parseRequest(url, 'GET');
        expect(parsed).toBe(false);
    });

    it('pattern check /can<any>one/<name:\\w+>/should<now:\\W+>do-it/<see:(\\w+)>-<nice:([a-zA-Z]+)>-now-<only:\\d+>-not/user/<id:\\d+>', () => {
        let rule = new RouteRule(app, {
            url: '/can<any>one/<name:\\w+>/should<now:\\W+>do-it/<see:(\\w+)>-<nice:([a-zA-Z]+)>-now-<only:\\d+>-not/user/<id:\\d+>',
            route: 'user/view'
        });

        let url = '/canbeone/igor/should#+do-it/whata-smile-now-2306-not/user/1412';
        let parsed = rule.parseRequest(url, 'GET');

        let paramsMap = {};
        let params = {
            any: 'be',
            name: 'igor',
            now: '#+',
            see: 'whata',
            nice: 'smile',
            only: '2306',
            id: '1412'
        };
        Object.assign(paramsMap, params);
        expect(parsed).toEqual({
            pathname: '/canbeone/igor/should#+do-it/whata-smile-now-2306-not/user/1412',
            method: 'GET',
            dataEvent: false,
            query: paramsMap,
            route: 'user/view'
        });

        let urlResult = rule.createUrl('user/view', paramsMap);
        expect(urlResult).toBe(url);

        let nmap = Object.assign({}, paramsMap);
        nmap.g = '1 und 1';
        urlResult = rule.createUrl('user/view', nmap);
        expect(urlResult).toBe(url + '?g=1%20und%201');

        delete parsed.query.id;

        urlResult = rule.createUrl('user/view', Object.assign({}, parsed.query));
        expect(urlResult).toBe(false);

        parsed.query.id = 'MY TEST';
        urlResult = rule.createUrl('user/view', Object.assign({}, parsed.query));
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
        expect(a.pattern).toEqual(/^can([\s\S]+)one$/);

        expect(a1.source).toBe('(\\w+)');
        expect(a1.original).toBe('<name:\\w+>');
        expect(a1.pattern).toEqual(/^(\w+)$/);

        expect(a2.source).toBe('should(\\W+)do-it');
        expect(a2.original).toBe('should<now:\\W+>do-it');
        expect(a2.pattern).toEqual(/^should(\W+)do-it$/);

        expect(a3.source).toBe('(\\w+)-([a-zA-Z]+)-now-(\\d+)-not');
        expect(a3.original).toBe('<see:(\\w+)>-<nice:([a-zA-Z]+)>-now-<only:\\d+>-not');
        expect(a3.pattern).toEqual(/^(\w+)-([a-zA-Z]+)-now-(\d+)-not$/);

        expect(a4.source).toBe('user');
        expect(a4.original).toBe('user');
        expect(a4.pattern).toEqual(/^user$/);

        expect(a5.source).toBe('(\\d+)');
        expect(a5.original).toBe('<id:\\d+>');
        expect(a5.pattern).toEqual(/^(\d+)$/);

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