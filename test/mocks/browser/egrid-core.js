'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
function mockAdjacencyList() {}
mockAdjacencyList.addVertex = () => {};
mockAdjacencyList.clearVertex = () => {};
mockAdjacencyList.edges = () => {};
mockAdjacencyList.removeVertex = () => {};
mockAdjacencyList.vertices = () => {};

mockAdjacencyList.get = (u) => {
  return {
    label: 'dummy' + u
  };
};

function mockGraph() {}
mockGraph.adjacencyList = () => mockAdjacencyList;

export const mockEgrid = {
  core: {
    graph: mockGraph
  }
};

/* stubs */
sinon.stub(injector, 'egrid').returns(mockEgrid);

export const stubAdjacencyList = {
  addVertex:    sinon.stub(mockAdjacencyList, 'addVertex'),
  clearVertex:  sinon.stub(mockAdjacencyList, 'clearVertex'),
  get:          sinon.stub(mockAdjacencyList, 'get', mockAdjacencyList.get),
  removeVertex: sinon.stub(mockAdjacencyList, 'removeVertex'),
  vertices:     sinon.stub(mockAdjacencyList, 'vertices').returns([42, 43, 44])
};

((stub) => {
  for (var i = 0; i < 10; i++) {stub.onCall(i).returns(i)}
  stub.returns(i + 1);
})(stubAdjacencyList.addVertex);

export const stubGraph = {
  adjacencyList: sinon.stub(mockGraph, 'adjacencyList').returns(mockAdjacencyList)
};