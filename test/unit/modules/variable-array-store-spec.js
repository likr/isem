'use strict';
var assert = require('power-assert').customize({output: {maxDepth: 2}});
var sinon  = require('sinon');

var stubAdjacencyList = require('../../mocks/browser/egrid-core').stubAdjacencyList;
var stubDispatcher    = require('../../mocks/isem/network-diagram-dispatcher').stub;
var stubRootScope     = require('../../mocks/browser/angular').stubRootScope;

var converterTestDouble = require('../../mocks/isem/csv-to-alpha-converter');
var mockConverter = converterTestDouble.mock;
var stubConverter = converterTestDouble.stub;
var dummyResult   = converterTestDouble.dummyResult;

var Store = require('../../../app/src/scripts/modules/variable-array-store').singleton;

import {allReset} from '../../utils';

describe('VariableArrayStore', () => {
  beforeEach(() => {
    allReset(stubAdjacencyList);
    allReset(stubDispatcher);
  });

  describe('#init()', () => {
    beforeEach(() => {
      Store.init();
    });

    it('should do Dispatcher#addHandlers()', () => {
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

    it('should replace variables to Store.variableArray', () => {
      var expected = [
        {label: 'dummy42', vertexId: 42},
        {label: 'dummy43', vertexId: 43},
        {label: 'dummy44', vertexId: 44}
      ];
      assert.deepEqual(Store.variableArray, expected);
    });

    it('should do #basePublish()', () => {
      assert(publish.callCount === 1);
    });
  });

  describe('#importFile()', () => {
    // commonize for afterEach
    function stubConverterConvertRestore() {
      stubConverter.convert.restore();
      stubConverter.convert = sinon.stub(mockConverter.prototype, 'convert');
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

      it('should give the callbacks arg to arg[0] of Converter#convert()', () => {
        assert(stubConverter.convert.getCall(0).args[0] === 'dummy');
      });

      it('should do #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 1);
      });

      it('should replace variables to Store.variableArray', () => {
        var expected = [
          {label: 'dummy42', vertexId: 42},
          {label: 'dummy43', vertexId: 43},
          {label: 'dummy44', vertexId: 44}
        ];
        assert.deepEqual(Store.variableArray, expected);
      });

      it('should do #basePublish()', () => {
        assert(publish.callCount === 1);
      });
    });

    context('when converter threw', () => {
      beforeEach(() => {
        stubConverter.convert.throws('TypeError');
        Store.importFile(null, 'dummy');
      });

      afterEach(stubConverterConvertRestore);

      it('should give the error object to arg[0] of #basePublish()', () => {
        var error = publish.getCall(0).args[0];
        assert(error.name === 'TypeError');
      });

      it('should NOT do #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 0);
      });
    });

    context('when returned no result', () => {
      beforeEach(() => {
        stubConverter.convert.returns(void 0);
        Store.importFile(null, 'dummy');
      });

      afterEach(stubConverterConvertRestore);

      it('should give the error object to arg[0] of #basePublish()', () => {
        var error = publish.getCall(0).args[0];
        assert(error.name === 'Error');
      });

      it('should NOT do #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 0);
      });
    });
  });

  describe('#removeAllVertex()', () => {
    beforeEach(() => {
      Store.removeAllVertex();
    });

    it('should do AdjacencyList#clearVertex() 3 times', () => {
      assert(stubAdjacencyList.clearVertex.callCount === 3);
    });

    it('should do AdjacencyList#removeVertex() 3 times', () => {
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