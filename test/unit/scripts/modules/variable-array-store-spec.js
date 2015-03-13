'use strict';
import powerAssert from 'power-assert';
import sinon from 'sinon';
import * as utils from '../../../utils';
const assert = powerAssert.customize({output: {maxDepth: 2}});

import {Direction} from '../../../../app/src/views/dialogs/add-relation'

/* stubbing */
import '../../../mocks/browser/angular';
import {stubAdjacencyList} from '../../../mocks/browser/egrid-core';
import {stubDispatcher}    from '../../../mocks/isem/network-diagram-dispatcher';
import {stubVertex}        from '../../../mocks/isem/vertex';
import {mockConverter, stubConverter} from '../../../mocks/isem/csv-to-egrid-converter';

import {singleton as Store} from '../../../../app/src/scripts/modules/variable-array-store'

describe('VariableArrayStore', () => {
  beforeEach(() => {
    utils.allReset(stubAdjacencyList);
    utils.allReset(stubDispatcher);
    utils.allReset(stubVertex);
  });

  describe('#init()', () => {
    beforeEach(() => {
      Store.init();
    });

    it('should be called Dispatcher#addHandlers()', () => {
      assert(stubDispatcher.addHandlers.callCount === 1);
    });
  });

  describe('#addRelation()', () => {
    var spyStore;
    beforeEach(() => {
      spyStore = {
        updateStore: sinon.spy(Store, 'updateStore'),
        publish:     sinon.spy(Store, 'publish')
      };
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    context('when the direction x to y', () => {
      beforeEach(() => {
        const data = {direction: Direction.xToY, idX: 1, idY: 8};
        Store.addRelation(null, data);
      });

      it('should be called graph.addEdge() once', () => {
        assert(stubAdjacencyList.addEdge.callCount === 1);
      });

      it('should be given to graph.addEdge()', () => {
        assert(stubAdjacencyList.addEdge.getCall(0).args[0] === 1);
        assert(stubAdjacencyList.addEdge.getCall(0).args[1] === 8);
      });

      it('should be called #updateStore()', () => {
        assert(spyStore.updateStore.callCount === 1);
      });

      it('should be called #publish()', () => {
        assert(spyStore.publish.callCount === 1);
      });
    });

    context('when the direction mutual', () => {
      beforeEach(() => {
        const data = {direction: Direction.mutual, idX: 1, idY: 8};
        Store.addRelation(null, data);
      });

      it('should be called graph.addEdge() twice', () => {
        assert(stubAdjacencyList.addEdge.callCount === 2);
      });

      it('should be given to graph.addEdge()', () => {
        assert(stubAdjacencyList.addEdge.getCall(0).args[0] === 1);
        assert(stubAdjacencyList.addEdge.getCall(0).args[1] === 8);
        assert(stubAdjacencyList.addEdge.getCall(1).args[0] === 8);
        assert(stubAdjacencyList.addEdge.getCall(1).args[1] === 1);
      });

      it('should be called #updateStore()', () => {
        assert(spyStore.updateStore.callCount === 1);
      });

      it('should be called #publish()', () => {
        assert(spyStore.publish.callCount === 1);
      });
    });

    context('when the direction y to x', () => {
      beforeEach(() => {
        const data = {direction: Direction.yToX, idX: 1, idY: 8};
        Store.addRelation(null, data);
      });

      it('should be called graph.addEdge() once', () => {
        assert(stubAdjacencyList.addEdge.callCount === 1);
      });

      it('should be given to graph.addEdge()', () => {
        assert(stubAdjacencyList.addEdge.getCall(0).args[0] === 8);
        assert(stubAdjacencyList.addEdge.getCall(0).args[1] === 1);
      });

      it('should be called #updateStore()', () => {
        assert(spyStore.updateStore.callCount === 1);
      });

      it('should be called #publish()', () => {
        assert(spyStore.publish.callCount === 1);
      });
    });
  });

  describe('#addVariable()', () => {
    var spyStore;
    beforeEach(() => {
      spyStore = {
        updateStore: sinon.spy(Store, 'updateStore'),
        publish:     sinon.spy(Store, 'publish')
      };
      Store.variableArray = [{label: 'dummy42', vertexId: 42}];
      Store.addVariable(null, '2ndDummy');
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    it('should be replaced variables to Store.variableArray', () => {
      var expected = [
        {label: 'dummy42', vertexId: 42},
        {label: 'dummy43', vertexId: 43},
        {label: 'dummy44', vertexId: 44}
      ];
      assert.deepEqual(Store.variableArray, expected);
    });

    it('should be called #updateStore()', () => {
      assert(spyStore.updateStore.callCount === 1);
    });

    it('should be called #publish()', () => {
      assert(spyStore.publish.callCount === 1);
    });
  });

  describe('#importFile()', () => {
    // commonize for afterEach
    function convertRestub() {
      stubConverter.convert.restore();
      stubConverter.convert = sinon.stub(mockConverter, 'convert');
    }

    var spyStore;
    beforeEach(() => {
      spyStore = {
        publish:         sinon.spy(Store, 'publish'),
        removeAllVertex: sinon.spy(Store, 'removeAllVertex')
      };
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    context('when normal', () => {
      beforeEach(() => {
        Store.importFile(null, 'dummy');
      });

      it('should be given the callbacks arg to args[0] of Converter#convert()', () => {
        assert(stubConverter.convert.getCall(0).args[0] === 'dummy');
      });

      it('should be called #removeAllVertex()', () => {
        assert(spyStore.removeAllVertex.callCount === 1);
      });

      it('should be replaced variables to Store.variableArray', () => {
        var expected = [
          {label: 'dummy42', vertexId: 42},
          {label: 'dummy43', vertexId: 43},
          {label: 'dummy44', vertexId: 44}
        ];
        assert.deepEqual(Store.variableArray, expected);
      });

      it('should be called #basePublish()', () => {
        assert(spyStore.publish.callCount === 1);
      });
    });

    context('when converter threw', () => {
      beforeEach(() => {
        stubConverter.convert.throws('TypeError');
        Store.importFile(null, 'dummy');
      });

      afterEach(convertRestub);

      it('should be given the error object to args[0] of #basePublish()', () => {
        var error = spyStore.publish.getCall(0).args[0];
        assert(error.name === 'TypeError');
      });

      it('should NOT be called #removeAllVertex()', () => {
        assert(spyStore.removeAllVertex.callCount === 0);
      });
    });

    context('when returned no result', () => {
      beforeEach(() => {
        stubConverter.convert.returns(void 0);
        Store.importFile(null, 'dummy');
      });

      afterEach(convertRestub);

      it('should be given the error object to args[0] of #basePublish()', () => {
        var error = spyStore.publish.getCall(0).args[0];
        assert(error.name === 'Error');
      });

      it('should NOT be called #removeAllVertex()', () => {
        assert(spyStore.removeAllVertex.callCount === 0);
      });
    });
  });

  describe('#redrawDiagram()', () => {
    var spyStore;
    beforeEach(() => {
      spyStore = {
        publish: sinon.spy(Store, 'publish')
      };
      Store.redrawDiagram();
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    it('should be called #publish()', () => {
      assert(spyStore.publish.callCount === 1);
    });
  });

  describe('#removeRelation()', () => {
    const removeTarget = [
      {u: 1, v: 2},
      {u: 1, v: 3},
      {u: 2, v: 3}
    ];

    var spyStore;
    beforeEach(() => {
      spyStore = {
        updateStore: sinon.spy(Store, 'updateStore'),
        publish:     sinon.spy(Store, 'publish')
      };
      Store.removeRelation(null, removeTarget);
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    it('should be called graph.removeEdge() same number of times as removeTarget.length', () => {
      assert(stubAdjacencyList.removeEdge.callCount === removeTarget.length);
    });

    it('should be given to graph.removeEdge()', () => {
      for (let i = 0; i < removeTarget.length; i++) {
        assert(stubAdjacencyList.removeEdge.getCall(i).args[0] === removeTarget[i].u);
        assert(stubAdjacencyList.removeEdge.getCall(i).args[1] === removeTarget[i].v);
      }
    });

    it('should be called #updateStore()', () => {
      assert(spyStore.updateStore.callCount === 1);
    });

    it('should be called #publish()', () => {
      assert(spyStore.publish.callCount === 1);
    });
  });

  describe('#renameVariable()', () => {
    const data = {u: 1, label: 'label'};

    var spyStore;
    beforeEach(() => {
      spyStore = {
        updateStore: sinon.spy(Store, 'updateStore'),
        publish:     sinon.spy(Store, 'publish')
      };
      Store.renameVariable(null, data);
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    it('should be given to Vertex.renameVariable()', () => {
      assert(stubVertex.renameVariable.getCall(0).args[1] === data.u);
      assert(stubVertex.renameVariable.getCall(0).args[2] === data.label);
    });

    it('should be called #updateStore()', () => {
      assert(spyStore.updateStore.callCount === 1);
    });

    it('should be called #publish()', () => {
      assert(spyStore.publish.callCount === 1);
    });
  });

  describe('#disableVertexDisplay()', () => {
    var spyStore;
    beforeEach(() => {
      spyStore = {
        setEnabledToMultipleVertices: sinon.spy(Store, 'setEnabledToMultipleVertices'),

        updateStore: sinon.spy(Store, 'updateStore'),
        publish:     sinon.spy(Store, 'publish')
      };

      Store.disableVertexDisplay(null, [42, 43, 44]);
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    it('should be given to #setEnabledToMultipleVertices()', () => {
      assert.deepEqual(spyStore.setEnabledToMultipleVertices.getCall(0).args[0], [42, 43, 44]);
      assert          (spyStore.setEnabledToMultipleVertices.getCall(0).args[1] === false);
    });

    it('should be called #updateStore()', () => {
      assert(spyStore.updateStore.callCount === 1);
    });

    it('should be called #publish()', () => {
      assert(spyStore.publish.callCount === 1);
    });
  });

  describe('#enableVertexDisplay()', () => {
    var spyStore;
    beforeEach(() => {
      spyStore = {
        setEnabledToMultipleVertices: sinon.spy(Store, 'setEnabledToMultipleVertices'),

        updateStore: sinon.spy(Store, 'updateStore'),
        publish:     sinon.spy(Store, 'publish')
      };

      Store.enableVertexDisplay(null, [42, 43, 44]);
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    it('should be given to #setEnabledToMultipleVertices()', () => {
      assert.deepEqual(spyStore.setEnabledToMultipleVertices.getCall(0).args[0], [42, 43, 44]);
      assert          (spyStore.setEnabledToMultipleVertices.getCall(0).args[1] === true);
    });

    it('should be called #updateStore()', () => {
      assert(spyStore.updateStore.callCount === 1);
    });

    it('should be called #publish()', () => {
      assert(spyStore.publish.callCount === 1);
    });
  });

  describe('#toggleVertexDisplay()', () => {
    var spyStore;
    beforeEach(() => {
      spyStore = {
        updateStore: sinon.spy(Store, 'updateStore'),
        publish:     sinon.spy(Store, 'publish')
      };

      Store.toggleVertexDisplay(null, 42);
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    it('should be given to Vertex.toggleEnabled()', () => {
      assert(stubVertex.toggleEnabled.getCall(0).args[1] === 42);
    });

    it('should be called #updateStore()', () => {
      assert(spyStore.updateStore.callCount === 1);
    });

    it('should be called #publish()', () => {
      assert(spyStore.publish.callCount === 1);
    });
  });

  describe('#setEnabledToMultipleVertices()', () => {
    var spyStore;
    beforeEach(() => {
      spyStore = {
        updateStore: sinon.spy(Store, 'updateStore'),
        publish:     sinon.spy(Store, 'publish')
      };
    });

    afterEach(() => {
      utils.allReset(stubVertex);
      utils.allRestore(spyStore);
    });

    context('when give one id', () => {
      beforeEach(() => {
        Store.setEnabledToMultipleVertices(42, true);
      });

      it('should be given to Vertex.setEnabled()', () => {
        assert(stubVertex.setEnabled.getCall(0).args[1] === 42);
        assert(stubVertex.setEnabled.getCall(0).args[2] === true);
      });

      it('should be called Vertex.setEnabled() once', () => {
        assert(stubVertex.setEnabled.callCount === 1);
      });
    });

    context('when give multiple ids', () => {
      beforeEach(() => {
        Store.setEnabledToMultipleVertices([42, 43], true);
      });

      it('should be given to Vertex.toggleEnabled()', () => {
        assert(stubVertex.setEnabled.getCall(0).args[1] === 42);
        assert(stubVertex.setEnabled.getCall(0).args[2] === true);
        assert(stubVertex.setEnabled.getCall(1).args[1] === 43);
        assert(stubVertex.setEnabled.getCall(1).args[2] === true);
      });

      it('should be called Vertex.setEnabled() twice', () => {
        assert(stubVertex.setEnabled.callCount === 2);
      });
    });
  });

  describe('#updateVariableArray()', () => {
    beforeEach(() => {
      Store.variableArray = [];
      Store.updateVariableArray();
    });

    it('should be given to graph.get()', () => {
      assert(stubAdjacencyList.get.getCall(0).args[0] === 42);
      assert(stubAdjacencyList.get.getCall(1).args[0] === 43);
      assert(stubAdjacencyList.get.getCall(2).args[0] === 44);
    });

    it('should be set Store.variableArray', () => {
      const actual = Store.variableArray;
      const expected = [
        {label: 'dummy42', vertexId: 42},
        {label: 'dummy43', vertexId: 43},
        {label: 'dummy44', vertexId: 44}
      ];
      assert.deepEqual(actual, expected);
    });
  });

  describe('#updateEdgeArray()', () => {
    beforeEach(() => {
      Store.edgeArray = [];
      Store.updateEdgeArray();
    });

    it('should be called graph.edges()', () => {
      assert(stubAdjacencyList.edges.callCount === 1);
    });

    it('should be set Store.edgeArray', () => {
      const actual = Store.edgeArray;
      const expected = [[1, 2], [3, 4]];
      assert.deepEqual(actual, expected);
    });
  });

  describe('#replaceAllVertex()', () => {
    const data = {
      labels: ['A', 'B', 'C'],
      dataArray: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    };

    var spyStore;
    beforeEach(() => {
      spyStore = {
        removeAllVertex: sinon.spy(Store, 'removeAllVertex'),
        updateStore:     sinon.spy(Store, 'updateStore')
      };

      Store.replaceAllVertex(data);
    });

    afterEach(() => {
      utils.allRestore(spyStore);
    });

    it('should be called Vertex.addObservedVariable() 3 times', () => {
      assert(stubVertex.addObservedVariable.callCount === 3);
    });

    it('should be given to Vertex.addObservedVariable()', () => {
      assert          (stubVertex.addObservedVariable.getCall(1).args[1] === 'B');
      assert.deepEqual(stubVertex.addObservedVariable.getCall(1).args[2], [4, 5, 6]);
    });

    it('should be called #removeAllVertex()', () => {
      assert(spyStore.removeAllVertex.callCount === 1);
    });

    it('should be called #updateStore()', () => {
      assert(spyStore.updateStore.callCount === 1);
    });
  });

  describe('#removeAllVertex()', () => {
    beforeEach(() => {
      Store.removeAllVertex();
    });

    it('should be called AdjacencyList#clearVertex() 3 times', () => {
      assert(stubAdjacencyList.clearVertex.callCount === 3);
    });

    it('should be called AdjacencyList#removeVertex() 3 times', () => {
      assert(stubAdjacencyList.removeVertex.callCount === 3);
    });

    it('The argument of when called should be vertexId', () => {
      var stub = stubAdjacencyList.clearVertex;
      var actual = [
        stub.getCall(0).args[0],
        stub.getCall(1).args[0],
        stub.getCall(2).args[0]
      ];
      assert.deepEqual(actual, [42, 43, 44]);
    });
  });
});