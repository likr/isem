'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.addListenerToChange = () => {};
mock.prototype.addListenerToClickAddRelationButton = () => {};
mock.prototype.addListenerToClickVertex = () => {};

sinon.stub(IsemInjector, 'NetworkDiagramRenderer').returns(mock.prototype);

var stub = {
  addListenerToChange:                 sinon.stub(mock.prototype, 'addListenerToChange'),
  addListenerToClickAddRelationButton: sinon.stub(mock.prototype, 'addListenerToClickAddRelationButton'),
  addListenerToClickVertex:            sinon.stub(mock.prototype, 'addListenerToClickVertex')
};

module.exports = {
  mock: mock,
  stub: stub
};
