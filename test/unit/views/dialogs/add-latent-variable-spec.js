'use strict';
import constants from '../../../../app/src/scripts/constants';
import powerAssert from 'power-assert';
import sinon from 'sinon';
let assert = powerAssert.customize({output: {maxDepth: 2}});

/* stubbing */
import '../../../mocks/browser/angular';

/* mocking */
import {
  Controller as ControllerStatic,
  Definition
} from '../../../../app/src/views/dialogs/add-latent-variable';
var mockRootScope, stubRootScope, mockScope, stubScope;
let Controller = (() => {
  mockRootScope = {
    $broadcast: () => {}
  };
  stubRootScope = {
    $broadcast: sinon.stub(mockRootScope, '$broadcast')
  };

  mockScope = {
    dialog: {close: () => {}},
    locale: () => 'ja'
  };
  stubScope = {
    dialog: {
      close: sinon.stub(mockScope.dialog, 'close')
    }
  };
  return new ControllerStatic(mockRootScope, mockScope);
})();

describe('DialogAddLatentVariable', () => {
  describe('Controller', () => {
    describe('#add()', () => {
      var dummy = 'dummy';
      before(() => {
        Controller.add(dummy);
      });

      it('should give the event name to arg[0] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[0] === constants.ADD_LATENT_VARIABLE);
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
        assert(Definition.ddo().controllerAs === 'Controller');
      });
    });
  });

});