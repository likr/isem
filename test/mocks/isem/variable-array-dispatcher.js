'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.init = () => {};
mock.prototype.registerOnAddVariable = () => {};
mock.prototype.registerOnImportFile = () => {};

sinon.stub(IsemInjector, 'VariableArrayDispatcher').returns(mock.prototype);

var stub = {
  init:                  sinon.stub(mock.prototype, 'init'),
  registerOnAddVariable: sinon.stub(mock.prototype, 'registerOnAddVariable'),
  registerOnImportFile:  sinon.stub(mock.prototype, 'registerOnImportFile')
};

module.exports.mock = mock;
module.exports.stub = stub;