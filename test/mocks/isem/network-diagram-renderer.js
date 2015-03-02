'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.addChangeListener = () => {};

sinon.stub(IsemInjector, 'NetworkDiagramRenderer').returns(mock.prototype);

var stub = {
  addChangeListener: sinon.stub(mock.prototype, 'addChangeListener')
};

module.exports = {
  mock: mock,
  stub: stub
};
