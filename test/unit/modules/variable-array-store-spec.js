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

function allReset(stubs) {
  Object.keys(stubs).forEach(v => stubs[v].reset());
}

describe('VariableArrayStore', () => {
  beforeEach(() => {
    allReset(stubAdjacencyList);
    Store.init(); // require for inject mocks!
  });

  describe('#registerWithDispatcher()', () => {
    beforeEach(() => {
      allReset(stubDispatcher);
      Store.registerWithDispatcher();
    });

    it('should give the callback to arg[0] of Dispatcher#onAddVariable()', () => {
      var actual = stubDispatcher.onAddVariable.getCall(0).args[0];
      var expected = Store.onAddVariableCallback();
      assert(String(actual) === String(expected));
    });

    it('should give the callback to arg[0] of Dispatcher#onImportFile()', () => {
      var actual = stubDispatcher.onImportFile.getCall(0).args[0];
      var expected = Store.onImportFileCallback();
      assert(String(actual) === String(expected));
    });
  });

  describe('#onAddVariableCallback()', () => {
    var publishChange;
    beforeEach(() => {
      publishChange = sinon.stub(Store, 'publishChange');
      Store.variableArray = [{label: 'dummy42', vertexId: 42}];
      Store.onAddVariableCallback()(null, '2ndDummy');
    });

    afterEach(() => {
      publishChange.restore();
    });

    it('should replace variables to Store.variableArray', () => {
      var expected = [
        {label: 'dummy42', vertexId: 42},
        {label: 'dummy43', vertexId: 43},
        {label: 'dummy44', vertexId: 44}
      ];
      assert.deepEqual(Store.variableArray, expected);
    });

    it('should do #publishChange()', () => {
      assert(publishChange.callCount === 1);
    });
  });

  describe('#onImportFileCallback()', () => {
    // commonize for afterEach
    function stubConverterConvertRestore() {
      stubConverter.convert.restore();
      stubConverter.convert = sinon.stub(mockConverter.prototype, 'convert');
    }

    var publishChange, removeAllVertex;
    beforeEach(() => {
      publishChange   = sinon.stub(Store, 'publishChange');
      removeAllVertex = sinon.stub(Store, 'removeAllVertex');
    });

    afterEach(() => {
      publishChange.restore();
      removeAllVertex.restore();
    });

    context('when normal', () => {
      beforeEach(() => {
        Store.onImportFileCallback()(null, 'dummy');
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

      it('should do #publishChange()', () => {
        assert(publishChange.callCount === 1);
      });
    });

    context('when converter threw', () => {
      beforeEach(() => {
        stubConverter.convert.throws('TypeError');
        Store.onImportFileCallback()(null, 'dummy');
      });

      afterEach(stubConverterConvertRestore);

      it('should give the error object to arg[0] of #publishChange()', () => {
        var error = publishChange.getCall(0).args[0];
        assert(error.name === 'TypeError');
      });

      it('should NOT do #removeAllVertex()', () => {
        assert(removeAllVertex.callCount === 0);
      });
    });

    context('when returned no result', () => {
      beforeEach(() => {
        stubConverter.convert.returns(void 0);
        Store.onImportFileCallback()(null, 'dummy');
      });

      afterEach(stubConverterConvertRestore);

      it('should give the error object to arg[0] of #publishChange()', () => {
        var error = publishChange.getCall(0).args[0];
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

  describe('#addChangeListener()', () => {
    var dummy = 'addChangeListenerListener';
    beforeEach(() => {
      stubRootScope.$on.reset();
      Store.init();
      Store.addChangeListener(dummy);
    });

    it('should give the event name to arg[0] of $on()', () => {
      assert(stubRootScope.$on.getCall(0).args[0] === Store.constructor.CHANGE_EVENT);
    });

    it('should give the listener to arg[1] of $on()', () => {
      assert(stubRootScope.$on.getCall(0).args[1] === dummy);
    });
  });

  describe('#publishChange()', () => {
    afterEach(() => {
      stubRootScope.$broadcast.reset();
    });

    context('when normal', () => {
      beforeEach(() => {
        Store.publishChange();
      });

      it('should give the event name to arg[0] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[0] === Store.constructor.CHANGE_EVENT);
      });

      it('should NOT give to arg[1] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[1] === void 0);
      });
    });

    context('when an error', () => {
      var err;
      beforeEach(() => {
        err = new Error('dummy');
        Store.publishChange(err);
      });

      it('should give the error object to arg[1] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[1] === err);
      });
    });
  });
});