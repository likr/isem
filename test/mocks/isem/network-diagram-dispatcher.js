'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.onAddRelation = () => {};
mock.prototype.onAddVariable = () => {};
mock.prototype.onDisableVertexDisplay = () => {};
mock.prototype.onEnableVertexDisplay = () => {};
mock.prototype.onImportFile = () => {};
mock.prototype.onRedrawDiagram = () => {};
mock.prototype.onRemoveRelation = () => {};
mock.prototype.onToggleVertexDisplay = () => {};

sinon.stub(IsemInjector, 'NetworkDiagramDispatcher').returns(mock.prototype);

var stub = {
  onAddRelation:          sinon.stub(mock.prototype, 'onAddRelation'),
  onAddVariable:          sinon.stub(mock.prototype, 'onAddVariable'),
  onDisableVertexDisplay: sinon.stub(mock.prototype, 'onDisableVertexDisplay'),
  onEnableVertexDisplay:  sinon.stub(mock.prototype, 'onEnableVertexDisplay'),
  onImportFile:           sinon.stub(mock.prototype, 'onImportFile'),
  onRedrawDiagram:        sinon.stub(mock.prototype, 'onRedrawDiagram'),
  onRemoveRelation:       sinon.stub(mock.prototype, 'onRemoveRelation'),
  onToggleVertexDisplay:  sinon.stub(mock.prototype, 'onToggleVertexDisplay')
};

module.exports = {
  mock: mock,
  stub: stub
};