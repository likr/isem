'use strict';
import powerAssert from 'power-assert';
import sinon from 'sinon';
import {allReset} from '../../../utils';
let assert = powerAssert.customize({output: {maxDepth: 2}});

/* stubbing */
import '../../../mocks/browser/angular';
import {stubAdjacencyList} from '../../../mocks/browser/egrid-core';
import {stubDispatcher}    from '../../../mocks/isem/network-diagram-dispatcher';
import {mockConverter, stubConverter} from '../../../mocks/isem/csv-to-egrid-converter';

import {singleton as Store} from '../../../../app/src/scripts/modules/variable-array-store'

describe('VariableArrayStore', () => {
  beforeEach(() => {
    allReset(stubAdjacencyList);
    allReset(stubDispatcher);
  });

  describe('#init()', () => {
    beforeEach(() => {
      Store.init();
    });

    it('should be done Dispatcher#addHandlers()', () => {
      assert(stubDispatcher.addHandlers.callCount === 1);
    });
  });

  describe('#addVariable()', () => {
    var publish;
    beforeEach(() => {
      publish = sinon.stub(Store, 'publish');
      Store.variableArray = [{label: 'dummy42', vertexId: 42}];
      Store.addVariable(null, '2ndDummy');
    });

    afterEach(() => {
      publish.restore();
    });

    it('should be replaced variables to Store.variableArray', () => {
      var expected = [
        {label: 'dummy42', vertexId: 42},
        {label: 'dummy43', vertexId: 43},
        {label: 'dummy44', vertexId: 44}
      ];
      assert.deepEqual(Store.variableArray, expected);
    });

    it('should be done #basePublish()', () => {
      assert(publish.callCount === 1);
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

      it('should be given the callbacks arg to arg[0] of Converter#convert()', () => {
        assert(stubConverter.convert.getCall(0).args[0] === 'dummy');
      });

      it('should be done #removeAllVertex()', () => {
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

      it('should be done #basePublish()', () => {
        assert(publish.callCount === 1);
      });
    });

    context('when converter threw', () => {
      beforeEach(() => {
        stubConverter.convert.throws('TypeError');
        Store.importFile(null, 'dummy');
      });

      afterEach(stubConverterConvertRestore);

      it('should be given the error object to arg[0] of #basePublish()', () => {
        var error = publish.getCall(0).args[0];
        assert(error.name === 'TypeError');
      });

      it('should NOT be done #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 0);
      });
    });

    context('when returned no result', () => {
      beforeEach(() => {
        stubConverter.convert.returns(void 0);
        Store.importFile(null, 'dummy');
      });

      afterEach(stubConverterConvertRestore);

      it('should be given the error object to arg[0] of #basePublish()', () => {
        var error = publish.getCall(0).args[0];
        assert(error.name === 'Error');
      });

      it('should NOT be done #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 0);
      });
    });
  });

  describe('#removeAllVertex()', () => {
    beforeEach(() => {
      Store.removeAllVertex();
    });

    it('should be done AdjacencyList#clearVertex() 3 times', () => {
      assert(stubAdjacencyList.clearVertex.callCount === 3);
    });

    it('should be done AdjacencyList#removeVertex() 3 times', () => {
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