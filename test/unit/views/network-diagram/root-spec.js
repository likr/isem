'use strict';
var assert = require('power-assert').customize({output: {maxDepth: 2}});
var sinon = require('sinon');
var lolex = require('lolex');

require('../../../mocks/browser/angular');
var stubStore    = require('../../../mocks/isem/variable-array-store').stub;
var stubRenderer = require('../../../mocks/isem/network-diagram-renderer').stub;

var NetworkDiagram = require('../../../../app/src/views/network-diagram/root');
var ControllerStatic = NetworkDiagram.Controller;

var mockRootScope, stubRootScope, mockScope, stubScope;
var Controller = (() => {
  mockRootScope = {
    $broadcast: () => {}
  };
  stubRootScope = {
    $broadcast: sinon.stub(mockRootScope, '$broadcast')
  };
  mockScope = {
    $apply: () => {}
  };
  stubScope = {
    $apply: sinon.stub(mockScope, '$apply', (cb) => {cb()})
  };
  return new ControllerStatic(mockRootScope, mockScope);
})();
var Definition = NetworkDiagram.Definition;

import {allReset} from '../../../utils';

describe('NetworkDiagramRoot', () => {
  describe('Controller', () => {
    describe('#subscribe()', () => {
      beforeEach(() => {
        allReset(stubStore);
        allReset(stubRenderer);
        Controller.subscribe();
      });

      it('should do Store#addListener()', () => {
        assert(stubStore.addListener.callCount === 1);
      });

      it('should do Renderer#addListener()', () => {
        assert(stubRenderer.addListener.callCount === 1);
      });
    });

    describe('#storeChangeHandler()', () => {
      var clock;
      beforeEach(() => {
        clock = lolex.install(global);
        Controller.storeChangeHandler();
      });

      afterEach(() => {
        clock.uninstall();
      });

      it('should set to $scope', () => {
        clock.tick(0); // Fire setTimeout
        assert(Controller.$scope.variableArray === 'dummyVariableArray');
      });
    });
  });

  describe('Definition', () => {
    describe('.ddo()', () => {
      it('should return the field of controllerAs including the correct name', () => {
        assert(Definition.ddo().controllerAs === 'Controller');
      });
    });
  });

});