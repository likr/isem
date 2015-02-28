'use strict';
var sinon = require('sinon');
var Injector = require('../../../app/src/scripts/injector');

function mockAdjacencyList() {}
mockAdjacencyList.addVertex = () => {};
mockAdjacencyList.clearVertex = () => {};
mockAdjacencyList.removeVertex = () => {};
mockAdjacencyList.vertices = () => {};

function mockGraph() {}
mockGraph.adjacencyList = () => mockAdjacencyList;

var mockEgrid = {
  core: {
    graph: mockGraph
  }
};

sinon.stub(Injector, 'egrid').returns(mockEgrid);

var stubAdjacencyList = {
  addVertex:    sinon.stub(mockAdjacencyList, 'addVertex'),
  clearVertex:  sinon.stub(mockAdjacencyList, 'clearVertex'),
  removeVertex: sinon.stub(mockAdjacencyList, 'removeVertex'),
  vertices:     sinon.stub(mockAdjacencyList, 'vertices').returns([42, 43, 44])
};

((stub) => {
  for (var i = 0; i < 10; i++) {stub.onCall(i).returns(i);}
  stub.returns(i + 1);
})(stubAdjacencyList.addVertex);

var stubGraph = {
  adjacencyList: sinon.stub(mockGraph, 'adjacencyList').returns(mockAdjacencyList)
};

module.exports = {
  mockEgrid: mockEgrid,
  stubAdjacencyList: stubAdjacencyList,
  stubGraph: stubGraph
};
