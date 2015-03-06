'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.onAddRelation = () => {};
mock.prototype.onAddVariable = () => {};
mock.prototype.onImportFile = () => {};
mock.prototype.onToggleVertexDisplay = () => {};

sinon.stub(IsemInjector, 'NetworkDiagramDispatcher').returns(mock.prototype);

var stub = {
  onAddRelation:          sinon.stub(mock.prototype, 'onAddRelation'),
  onAddVariable:          sinon.stub(mock.prototype, 'onAddVariable'),
  onImportFile:           sinon.stub(mock.prototype, 'onImportFile'),
  onToggleVertexDisplay:  sinon.stub(mock.prototype, 'onToggleVertexDisplay')
};

module.exports = {
  mock: mock,
  stub: stub
};