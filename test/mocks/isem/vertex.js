'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
export function mockVertex() {}
mockVertex.addObservedVariable = () => {};
mockVertex.addLatentVariable = () => {};
mockVertex.renameVariable = () => {};
mockVertex.setEnabled = () => {};
mockVertex.toggleEnabled = () => {};

/* stubs */
sinon.stub(injector, 'Vertex').returns(mockVertex);

export const stubVertex = {
  addObservedVariable: sinon.stub(mockVertex, 'addObservedVariable'),
  addLatentVariable:   sinon.stub(mockVertex, 'addLatentVariable'),
  renameVariable:      sinon.stub(mockVertex, 'renameVariable'),
  setEnabled:          sinon.stub(mockVertex, 'setEnabled'),
  toggleEnabled:       sinon.stub(mockVertex, 'toggleEnabled')
};