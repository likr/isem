'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
export function mockRenderer() {}
mockRenderer.prototype.addListener = () => {};

/* stubs */
sinon.stub(injector, 'NetworkDiagramRenderer').returns(mockRenderer.prototype);

export const stubRenderer = {
  addListener: sinon.stub(mockRenderer.prototype, 'addListener')
};