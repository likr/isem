'use strict';
var assert = require('power-assert').customize({output: {maxDepth: 2}});
var sinon = require('sinon');
var lolex = require('lolex');

require('../../../mocks/browser/angular');
require('../../../mocks/browser/promise');
var stubStore    = require('../../../mocks/isem/variable-array-store').stub;
var stubRenderer = require('../../../mocks/isem/network-diagram-renderer').stub;

var NetworkDiagram = require('../../../../app/src/views/network-diagram/root');
var ControllerStatic = NetworkDiagram.Controller;

var mockRootScope, stubRootScope, mockScope;
var Controller = (() => {
  mockRootScope = {
    $broadcast: () => {}
  };
  stubRootScope = {
    $broadcast: sinon.stub(mockRootScope, '$broadcast')
  };
  mockScope = {};
  return new ControllerStatic(mockRootScope, mockScope, global.setTimeout);
})();
var Definition = NetworkDiagram.Definition;

import {allReset} from '../../../utils';

describe('NetworkDiagramRoot', () => {
  describe('Controller#subscribe()', () => {
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

  describe('Controller#storeChangeHandler()', () => {
    var clock, promise;
    beforeEach(() => {
      clock = lolex.install(global);
      promise = Controller.storeChangeHandler();
      clock.tick(0); // Fire setTimeout
    });

    afterEach(() => {
      clock.uninstall();
    });

    it('should set to $scope', (done) => {
      promise.then(() => {
        assert(Controller.$scope.variableArray === 'dummyVariableArray');
        done();
      });
    });
  });

  describe('Definition.ddo()', () => {
    it('should return the field of controllerAs including the correct name', () => {
      assert(Definition.ddo().controllerAs === 'Controller');
    });
  });

});