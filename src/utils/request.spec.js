import {expect} from 'chai';
import {stringifyOptions} from './request';

describe('Mapping a url from a string a object of options', function () {
    it('should give a full url with properties as names and values as url values', function () {
        expect(stringifyOptions({foo:'value', bar:123})).to.equal('foo=value&bar=123');
    });
});


describe('Empty options', function () {
    it('should give an empty string', function () {
        expect(stringifyOptions({})).to.equal('');
    });
});