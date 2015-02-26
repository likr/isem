'use strict';
var assert = require('power-assert').customize({output: {maxDepth: 2}});
var sinon = require('sinon');

require('../../../../mocks/angular');
var AddLatentVariable = require('../../../../../app/src/views/concretes/dialogs/add-latent-variable/add-latent-variable');
var ControllerStatic = AddLatentVariable.Controller;

var mockRootScope, stubRootScope, mockScope, stubScope;
var Controller = (() => {
  mockRootScope = {
    $broadcast: () => {}
  };
  stubRootScope = {
    $broadcast: sinon.stub(mockRootScope, '$broadcast')
  };

  mockScope = {
    dialog: {close: () => {}}
  };
  stubScope = {
    dialog: {
      close: sinon.stub(mockScope.dialog, 'close')
    }
  };
  return new ControllerStatic(mockRootScope, mockScope);
})();
var Definition = AddLatentVariable.Definition;

describe('DialogAddLatentVariable', () => {
  describe('Controller', () => {
    describe('#add()', () => {
      var dummy = 'dummy';
      before(() => {
        Controller.add(dummy);
      });

      it('should give the event name to arg[0] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[0] === 'isem:addVariable');
      });

      it('should give the value to arg[1] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[1] === dummy);
      });

      it('should do close()', () => {
        assert(stubScope.dialog.close.callCount === 1);
      });
    });
  });

  describe('Definition', () => {
    describe('.ddo()', () => {
      it('should return the field of require including the other controller', () => {
        assert(Definition.ddo().require === '^cwModal');
      });

      it('should return the field of controllerAs including the correct name', () => {
        assert(Definition.ddo().controllerAs === 'AddLatentVariableController');
      });
    });
  });

});