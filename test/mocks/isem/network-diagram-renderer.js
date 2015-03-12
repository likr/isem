'use strict';
var sinon = require('sinon');
var injector = require('../../../app/src/scripts/injector');

function mock() {}
mock.prototype.addListener = () => {};

sinon.stub(injector, 'NetworkDiagramRenderer').returns(mock.prototype);

var stub = {
  addListener: sinon.stub(mock.prototype, 'addListener')
};

module.exports = {
  mock: mock,
  stub: stub
};
