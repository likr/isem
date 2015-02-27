'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.convert = () => {};

sinon.stub(IsemInjector, 'CsvToAlphaConverter').returns(mock);

var dummyResult = {
  nodes: ['dummyNodes1', 'dummyNodes2']
};

var stub = {
  convert: sinon.stub(mock.prototype, 'convert').returns({then: (cb) => {return cb(dummyResult)}})
};

module.exports.mock = mock;
module.exports.stub = stub;
module.exports.dummyResult = dummyResult;