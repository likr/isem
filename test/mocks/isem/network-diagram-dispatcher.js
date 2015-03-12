'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
export function mockDispatcher() {}
mockDispatcher.prototype.addHandlers = () => {};

/* stubs */
sinon.stub(injector, 'NetworkDiagramDispatcher').returns(mockDispatcher.prototype);

export var stubDispatcher = {
  addHandlers: sinon.stub(mockDispatcher.prototype, 'addHandlers')
};