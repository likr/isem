'use strict';
var assert    = require('power-assert').customize({output: {maxDepth: 2}});
var sinon     = require('sinon');
var constants = require('../../../app/src/scripts/constants');

var stubRootScope = require('../../mocks/browser/angular').stubRootScope;

var Dispatcher = require('../../../app/src/scripts/modules/network-diagram-dispatcher').singleton;

describe('NetworkDiagramDispatcher', () => {
  describe('#onAddVariable()', () => {
    var dummy = 'listener';
    before(() => {
      stubRootScope.$on.reset();
      Dispatcher.onAddVariable(dummy);
    });

    it('should give the event name to arg[0] of $on()', () => {
      assert(stubRootScope.$on.getCall(0).args[0] === constants.ADD_LATENT_VARIABLE);
    });

    it('should give the listener to arg[1] of $on()', () => {
      assert(stubRootScope.$on.getCall(0).args[1] === dummy);
    });
  });

  describe('#onImportFile()', () => {
    var dummy = 'listener';
    before(() => {
      stubRootScope.$on.reset();
      Dispatcher.onImportFile(dummy);
    });

    it('should give the event name to arg[0] of $on()', () => {
      assert(stubRootScope.$on.getCall(0).args[0] === constants.IMPORT_FILE);
    });

    it('should give the listener to arg[1] of $on()', () => {
      assert(stubRootScope.$on.getCall(0).args[1] === dummy);
    });
  });
});