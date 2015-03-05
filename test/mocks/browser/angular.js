'use strict';
var sinon = require('sinon');
var Injector = require('../../../app/src/scripts/injector');

function mockAngular() {}
mockAngular.module = () => {
  return {
    config: () => {},
    directive: () => {},
    run: () => {}
  };
};
mockAngular.element = () => {};

function mockElements() {}
mockElements.eq = () => {};

function mockRootElement() {}
mockRootElement.scope = () => {};

function mockRootScope() {}
mockRootScope.$broadcast = () => {};
mockRootScope.$on = () => {};

sinon.stub(Injector, 'angular').returns(mockAngular);

module.exports = {
  stubAngular: {
    element: sinon.stub(mockAngular, 'element').withArgs('.ng-scope').returns(mockElements)
  },
  stubElements: {
    eq: sinon.stub(mockElements, 'eq').withArgs(0).returns(mockRootElement)
  },
  stubRootElement: {
    scope: sinon.stub(mockRootElement, 'scope').returns(mockRootScope)
  },
  stubRootScope: {
    $broadcast: sinon.stub(mockRootScope, '$broadcast'),
    $on:        sinon.stub(mockRootScope, '$on')
  }
};
