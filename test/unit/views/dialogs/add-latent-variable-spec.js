'use strict';
import constants from '../../../../app/src/scripts/constants';
import powerAssert from 'power-assert';
import sinon from 'sinon';
const assert = powerAssert.customize({output: {maxDepth: 2}});

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

      it('should be given the event name to args[0] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[0] === constants.ADD_LATENT_VARIABLE);
      });

      it('should be given the value to arg[1] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[1] === dummy);
      });

      it('should be called close()', () => {
        assert(stubScope.dialog.close.callCount === 1);
      });
    });
  });

  describe('Definition', () => {
    describe('.ddo()', () => {
      it('should be returned the field of require including the other controller', () => {
        assert(Definition.ddo().require === '^cwModal');
      });

      it('should be returned the field of controllerAs including the correct name', () => {
        assert(Definition.ddo().controllerAs === 'Controller');
      });
    });
  });

});