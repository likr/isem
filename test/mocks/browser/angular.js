'use strict';
var sinon = require('sinon');
var Injector = require('../../../app/src/scripts/injector');

function mockAngular() {}
mockAngular.module = () => {
  return {
    config: () => {},
    directive: () => {}
  };
};
mockAngular.element = () => {};

function mockElements() {}
mockElements.eq = () => {};

function mockRootElement() {}
mockRootElement.scope = () => {};

function mockRootScope() {}
mockRootScope.$on = () => {};

sinon.stub(Injector, 'angular').returns(mockAngular);

module.exports.stubAngular = {
  element: sinon.stub(mockAngular, 'element').withArgs('.ng-scope').returns(mockElements)
};

module.exports.stubElements = {
  eq: sinon.stub(mockElements, 'eq').withArgs(0).returns(mockRootElement)
};

module.exports.stubRootElement = {
  scope: sinon.stub(mockRootElement, 'scope').returns(mockRootScope)
};

module.exports.stubRootScope = {
  $on: sinon.stub(mockRootScope, '$on')
};
