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
import {mockConverter, stubConverter} from '../../../mocks/isem/csv-to-egrid-converter';

import {singleton as Store} from '../../../../app/src/scripts/modules/variable-array-store'

describe('VariableArrayStore', () => {
  beforeEach(() => {
    utils.allReset(stubAdjacencyList);
    utils.allReset(stubDispatcher);
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

      it('should be called graph#addEdge() once', () => {
        assert(stubAdjacencyList.addEdge.callCount === 1);
      });

      it('should be set to graph#addEdge()', () => {
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

      it('should be called graph#addEdge() twice', () => {
        assert(stubAdjacencyList.addEdge.callCount === 2);
      });

      it('should be set to graph#addEdge()', () => {
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

      it('should be called graph#addEdge() once', () => {
        assert(stubAdjacencyList.addEdge.callCount === 1);
      });

      it('should be set to graph#addEdge()', () => {
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
    function stubConverterConvertRestore() {
      stubConverter.convert.restore();
      stubConverter.convert = sinon.stub(mockConverter, 'convert');
    }

    var publish, removeAllVertex;
    beforeEach(() => {
      publish         = sinon.stub(Store, 'publish');
      removeAllVertex = sinon.stub(Store, 'removeAllVertex');
    });

    afterEach(() => {
      publish.restore();
      removeAllVertex.restore();
    });

    context('when normal', () => {
      beforeEach(() => {
        Store.importFile(null, 'dummy');
      });

      it('should be given the callbacks arg to args[0] of Converter#convert()', () => {
        assert(stubConverter.convert.getCall(0).args[0] === 'dummy');
      });

      it('should be called #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 1);
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
        assert(publish.callCount === 1);
      });
    });

    context('when converter threw', () => {
      beforeEach(() => {
        stubConverter.convert.throws('TypeError');
        Store.importFile(null, 'dummy');
      });

      afterEach(stubConverterConvertRestore);

      it('should be given the error object to args[0] of #basePublish()', () => {
        var error = publish.getCall(0).args[0];
        assert(error.name === 'TypeError');
      });

      it('should NOT be called #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 0);
      });
    });

    context('when returned no result', () => {
      beforeEach(() => {
        stubConverter.convert.returns(void 0);
        Store.importFile(null, 'dummy');
      });

      afterEach(stubConverterConvertRestore);

      it('should be given the error object to args[0] of #basePublish()', () => {
        var error = publish.getCall(0).args[0];
        assert(error.name === 'Error');
      });

      it('should NOT be called #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 0);
      });
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