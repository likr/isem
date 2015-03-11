'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.addListener = () => {};

sinon.stub(IsemInjector, 'NetworkDiagramRenderer').returns(mock.prototype);

var stub = {
  addListener: sinon.stub(mock.prototype, 'addListener')
};

module.exports = {
  mock: mock,
  stub: stub
};
