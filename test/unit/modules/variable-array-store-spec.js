'use strict';
var assert = require('power-assert').customize({output: {maxDepth: 2}});
var sinon  = require('sinon');

var stubRootScope     = require('../../mocks/browser/angular').stubRootScope;
var stubAdjacencyList = require('../../mocks/browser/egrid-core').stubAdjacencyList;
var stubDispatcher    = require('../../mocks/isem/variable-array-dispatcher').stub;

var converterTestDouble = require('../../mocks/isem/csv-to-alpha-converter');
var stubConverter = converterTestDouble.stub;
var dummyResult   = converterTestDouble.dummyResult;

var Store = require('../../../app/src/scripts/modules/variable-array-store').singleton;

describe('VariableArrayStore', () => {
  beforeEach(() => {
    Object.keys(stubAdjacencyList).forEach(v => stubAdjacencyList[v].reset());
    Store.init();
  });

  describe('#register()', () => {
    beforeEach(() => {
      Object.keys(stubDispatcher).forEach(v => stubDispatcher[v].reset());
      Store.register();
    });

    it('should do Dispatcher#init()', () => {
      assert(stubDispatcher.init.callCount === 1);
    });

    it('should do Dispatcher#registerOnAddVariable()', () => {
      assert(stubDispatcher.registerOnAddVariable.callCount === 1);
    });

    it('should give the callback to arg[0] of Dispatcher#registerOnAddVariable()', () => {
      var actual = stubDispatcher.registerOnAddVariable.getCall(0).args[0];
      var expected = Store.onAddVariableCallback();
      assert(String(actual) === String(expected));
    });

    it('should do Dispatcher#registerOnImportFile()', () => {
      assert(stubDispatcher.registerOnImportFile.callCount === 1);
    });

    it('should give the callback to arg[0] of Dispatcher#registerOnImportFile()', () => {
      var actual = stubDispatcher.registerOnImportFile.getCall(0).args[0];
      var expected = Store.onImportFileCallback();
      assert(String(actual) === String(expected));
    });
  });

  describe('#onAddVariableCallback()', () => {
    var publishChange;
    beforeEach(() => {
      publishChange = sinon.stub(Store, 'publishChange');
      Store.variableArray = ['1stDummy'];
      Store.onAddVariableCallback()(null, '2ndDummy');
    });

    afterEach(() => {
      publishChange.restore();
    });

    it('should set new variable to Store.variableArray', () => {
      var expected = [
        '1stDummy',
        {label: '2ndDummy', latent: true, enabled: true, vertexId: 0}
      ];
      assert.deepEqual(Store.variableArray, expected);
    });

    it('should do #publishChange()', () => {
      assert(publishChange.callCount === 1);
    });
  });

  describe('#onImportFileCallback()', () => {
    var publishChange;
    beforeEach(() => {
      publishChange = sinon.stub(Store, 'publishChange');
      Store.onImportFileCallback()(null, 'dummy');
    });

    afterEach(() => {
      publishChange.restore();
    });

    it('should give the callbacks arg to arg[0] of Converter#convert()', () => {
      assert(stubConverter.convert.getCall(0).args[0] === 'dummy');
    });

    it('should replace variables to Store.variableArray', () => {
      var expected = [
        {label: 'dummyNodes1', latent: false, enabled: true, data:[1, 2], vertexId: 0},
        {label: 'dummyNodes2', latent: false, enabled: true, data:[3, 4], vertexId: 1},
        {label: 'dummyNodes3', latent: false, enabled: true, data:[5, 6], vertexId: 2}
      ];
      assert.deepEqual(Store.variableArray, expected);
    });

    it('should do #publishChange()', () => {
      assert(publishChange.callCount === 1);
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
    beforeEach(() => {
      Store.publishChange();
    });

    it('should give the event name to arg[0] of $broadcast()', () => {
      assert(stubRootScope.$broadcast.getCall(0).args[0] === Store.constructor.CHANGE_EVENT);
    });

    it('should NOT give to arg[1] of $broadcast()', () => {
      assert(stubRootScope.$broadcast.getCall(0).args[1] == null);
    });
  });
});