'use strict';
var assert = require('power-assert').customize({output: {maxDepth: 2}});
var sinon = require('sinon');

require('../../../../mocks/browser/angular');
var stubStore = require('../../../../mocks/isem/variable-array-store').stub;

var NetworkDiagram = require('../../../../../app/src/views/concretes/network-diagram/root/root');
var ControllerStatic = NetworkDiagram.Controller;

var mockScope;
var Controller = (() => {
  mockScope = {};
  return new ControllerStatic(mockScope);
})();
var Definition = NetworkDiagram.Definition;

describe('NetworkDiagram', () => {
  describe('Controller', () => {
    describe('#subscribe()', () => {
      before(() => {
        Object.keys(stubStore).forEach((v, _) => {
          stubStore[v].restore();
        });
        Controller.subscribe();
      });

      it('should do Store#init()', () => {
        assert(stubStore.init.callCount === 1);
      });

      it('should do Store#addChangeListener()', () => {
        assert(stubStore.addChangeListener.callCount === 1);
      });

      it('should give the callback to arg[0] of Store#addChangeListener()', () => {
        var actual = stubStore.addChangeListener.getCall(0).args[0];
        var expected = Controller.changeCallback();
        assert(String(actual) === String(expected));
      });
    });

    describe('#changeCallback()', () => {
      beforeEach(() => {
        Controller.changeCallback()();
      });

      it('should set to $scope', () => {
        assert(Controller.$scope._variableArray === 'dummyVariableArray');
      });
    });
  });

  describe('Definition', () => {
    describe('.ddo()', () => {
      it('should return the field of controllerAs including the correct name', () => {
        assert(Definition.ddo().controllerAs === 'NetworkDiagramController');
      });
    });
  });

});