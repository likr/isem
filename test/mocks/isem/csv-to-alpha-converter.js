'use strict';
var sinon = require('sinon');
var injector = require('../../../app/src/scripts/injector');

function mock() {}
mock.prototype.convert = () => {};

sinon.stub(injector, 'CsvToAlphaConverter').returns(mock);

var dummyResult = {
  nodes: [
    'dummyNodes1',
    'dummyNodes2',
    'dummyNodes3'
  ],
  S: [
    [1, 2],
    [3, 4],
    [5, 6]
  ]
};

var stub = {
  convert: sinon.stub(mock.prototype, 'convert').returns(dummyResult)
};

module.exports.mock = mock;
module.exports.stub = stub;
module.exports.dummyResult = dummyResult;