'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {
  // Do nothing
}

mock.prototype.variableArray = 'dummyVariableArray';

mock.prototype.init = () => {};
mock.prototype.addChangeListener = () => {};

sinon.stub(IsemInjector, 'VariableArrayStore').returns(mock.prototype);

var stub = {
  init:              sinon.stub(mock.prototype, 'init'),
  addChangeListener: sinon.stub(mock.prototype, 'addChangeListener')
};

module.exports.mock = mock;
module.exports.stub = stub;