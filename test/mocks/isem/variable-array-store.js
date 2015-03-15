'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
export function mockStore() {}
mockStore.prototype.variableArray = 'dummyVariableArray';
mockStore.prototype.addListener = () => {};

/* stubs */
sinon.stub(injector, 'VariableArrayStore').returns(mockStore.prototype);

export const stubStore = {
  addListener: sinon.stub(mockStore.prototype, 'addListener')
};