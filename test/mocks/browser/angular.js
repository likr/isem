'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
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

/* stubs */
sinon.stub(injector, 'angular').returns(mockAngular);

export var stubAngular = {
  element: sinon.stub(mockAngular, 'element').withArgs('.ng-scope').returns(mockElements)
};

export var stubElements = {
  eq: sinon.stub(mockElements, 'eq').withArgs(0).returns(mockRootElement)
};

export var stubRootElement = {
  scope: sinon.stub(mockRootElement, 'scope').returns(mockRootScope)
};

export var stubRootScope = {
  $broadcast: sinon.stub(mockRootScope, '$broadcast'),
  $on:        sinon.stub(mockRootScope, '$on')
};