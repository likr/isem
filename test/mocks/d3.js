'use strict';
var sinon = require('sinon');
var Injector = require('../../app/src/scripts/injector');

var mockCsv = {
  parse: () => {}
};

var mockD3 = {
  csv: mockCsv
};

sinon.stub(Injector, 'd3').returns(mockD3);

var stubD3 = {
  csv: {
    parse: sinon.stub(mockCsv, 'parse')
  }
};

module.exports.mock = mockD3;
module.exports.stub = stubD3;