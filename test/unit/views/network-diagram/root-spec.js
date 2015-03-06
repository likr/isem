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

describe('NetworkDiagramRoot', () => {
  describe('Controller', () => {
    describe('#subscribe()', () => {
      before(() => {
        Object.keys(stubStore).forEach((v, _) => {
          stubStore[v].restore();
        });
        Controller.subscribe();
      });

      it('should give the callback to arg[0] of Store#addListenerToChange()', () => {
        var actual = stubStore.addListenerToChange.getCall(0).args[0];
        var expected = Controller.storeChangeCallback();
        assert(String(actual) === String(expected));
      });

      it('should give the callback to arg[0] of Renderer#addListenerToChange()', () => {
        var actual = stubRenderer.addListenerToChange.getCall(0).args[0];
        var expected = Controller.rendererChangeCallback();
        assert(String(actual) === String(expected));
      });

      it('should give the callback to arg[0] of Renderer#addListenerToClickAddRelationButton()', () => {
        var actual = stubRenderer.addListenerToClickAddRelationButton.getCall(0).args[0];
        var expected = Controller.clickAddRelationButtonCallback();
        assert(String(actual) === String(expected));
      });

      it('should give the callback to arg[0] of Renderer#addListenerToClickVertex()', () => {
        var actual = stubRenderer.addListenerToClickVertex.getCall(0).args[0];
        var expected = Controller.clickVertexCallback();
        assert(String(actual) === String(expected));
      });
    });

    describe('#storeChangeCallback()', () => {
      var clock;
      before(() => {
        clock = lolex.install(global);
        Controller.storeChangeCallback()();
      });

      after(() => {
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