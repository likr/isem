'use strict';
var sinon = require('sinon');
var injector = require('../../../app/src/scripts/injector');

function mock() {}
mock.prototype.addHandlers = () => {};

sinon.stub(injector, 'NetworkDiagramDispatcher').returns(mock.prototype);

var stub = {
  addHandlers: sinon.stub(mock.prototype, 'addHandlers')
};

module.exports = {
  mock: mock,
  stub: stub
};