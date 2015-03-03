'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.addListenerToClickAddRelationButton = () => {};

sinon.stub(IsemInjector, 'NetworkDiagramRenderer').returns(mock.prototype);

var stub = {
  addListenerToClickAddRelationButton: sinon.stub(mock.prototype, 'addListenerToClickAddRelationButton')
};

module.exports = {
  mock: mock,
  stub: stub
};
