'use strict';
import sinon from 'sinon';
import injector from '../../../app/src/scripts/injector';

/* mocks */
function mockAdjacencyList() {}
mockAdjacencyList.addEdge = () => {};
mockAdjacencyList.addVertex = () => {};
mockAdjacencyList.clearVertex = () => {};
mockAdjacencyList.edges = () => {};
mockAdjacencyList.removeEdge = () => {};
mockAdjacencyList.removeVertex = () => {};
mockAdjacencyList.vertices = () => {};
mockAdjacencyList.set = () => {};

mockAdjacencyList.get = (u) => {
  return {
    label: 'dummy' + u
  };
};

function mockGraph() {}
mockGraph.adjacencyList = () => mockAdjacencyList;

function mockEgm() {}
mockEgm.backgroundColor = () => {};
mockEgm.dagreNodeSep = () => {};
mockEgm.dagreRankSep = () => {};
mockEgm.edgeColor = () => {};
mockEgm.edgeText = () => {};
mockEgm.edgeWidth = () => {};
mockEgm.maxTextLength = () => {};
mockEgm.onClickVertex = () => {};
mockEgm.selectedStrokeColor = () => {};
mockEgm.strokeColor = () => {};
mockEgm.vertexAveilability = () => {};
mockEgm.vertexButtons = () => {};
mockEgm.vertexColor = () => {};
mockEgm.vertexText = () => {};

export const mockEgrid = {
  core: {
    graph: mockGraph,
    egm: mockEgm
  }
};

/* stubs */
sinon.stub(injector, 'egrid').returns(mockEgrid);

export const stubAdjacencyList = {
  addEdge:      sinon.stub(mockAdjacencyList, 'addEdge'),
  addVertex:    sinon.stub(mockAdjacencyList, 'addVertex'),
  clearVertex:  sinon.stub(mockAdjacencyList, 'clearVertex'),
  get:          sinon.stub(mockAdjacencyList, 'get', mockAdjacencyList.get),
  removeEdge:   sinon.stub(mockAdjacencyList, 'removeEdge'),
  removeVertex: sinon.stub(mockAdjacencyList, 'removeVertex'),
  set:          sinon.stub(mockAdjacencyList, 'set'),
  vertices:     sinon.stub(mockAdjacencyList, 'vertices').returns([42, 43, 44])
};

((stub) => {
  for (var i = 0; i < 10; i++) {stub.onCall(i).returns(i)}
  stub.returns(i + 1);
})(stubAdjacencyList.addVertex);

export const stubGraph = {
  adjacencyList: sinon.stub(mockGraph, 'adjacencyList').returns(mockAdjacencyList)
};

export const stubEgm = {
  backgroundColor:     sinon.stub(mockEgm, 'backgroundColor')    .returns(mockEgm),
  dagreNodeSep:        sinon.stub(mockEgm, 'dagreNodeSep')       .returns(mockEgm),
  dagreRankSep:        sinon.stub(mockEgm, 'dagreRankSep')       .returns(mockEgm),
  edgeColor:           sinon.stub(mockEgm, 'edgeColor')          .returns(mockEgm),
  edgeText:            sinon.stub(mockEgm, 'edgeText')           .returns(mockEgm),
  edgeWidth:           sinon.stub(mockEgm, 'edgeWidth')          .returns(mockEgm),
  maxTextLength:       sinon.stub(mockEgm, 'maxTextLength')      .returns(mockEgm),
  onClickVertex:       sinon.stub(mockEgm, 'onClickVertex')      .returns(mockEgm),
  selectedStrokeColor: sinon.stub(mockEgm, 'selectedStrokeColor').returns(mockEgm),
  strokeColor:         sinon.stub(mockEgm, 'strokeColor')        .returns(mockEgm),
  vertexAveilability:  sinon.stub(mockEgm, 'vertexAveilability') .returns(mockEgm),
  vertexButtons:       sinon.stub(mockEgm, 'vertexButtons')      .returns(mockEgm),
  vertexColor:         sinon.stub(mockEgm, 'vertexColor')        .returns(mockEgm),
  vertexText:          sinon.stub(mockEgm, 'vertexText')         .returns(mockEgm)
};