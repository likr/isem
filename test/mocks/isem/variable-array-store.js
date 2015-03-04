'use strict';
var sinon = require('sinon');
var IsemInjector = require('../../../app/src/scripts/isem-injector');

function mock() {}
mock.prototype.variableArray = 'dummyVariableArray';
mock.prototype.addListenerToChange = () => {};

sinon.stub(IsemInjector, 'VariableArrayStore').returns(mock.prototype);

var stub = {
  addListenerToChange: sinon.stub(mock.prototype, 'addListenerToChange')
};

module.exports.mock = mock;
module.exports.stub = stub;