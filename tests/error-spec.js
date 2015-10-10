'use strict';

describe('error', () => {
    let di = require('../');
    let error = di.load('@{en}/error');

    it('should throw Exception', function throwException() {
        let m;
        try {
            new error.Exception('This is an test');
        } catch (e) {
            m = e.toString();
        }
        expect(m.indexOf('This is an test')).toBe(12);
    });
});