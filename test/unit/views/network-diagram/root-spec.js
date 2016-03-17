'use strict';
import constants from '../../../../app/src/scripts/constants';
import lolex from 'lolex';
import powerAssert from 'power-assert';
import sinon from 'sinon';
import {resetAll} from '../../../utils';
const assert = powerAssert.customize({output: {maxDepth: 2}});

/* stubbing */
import '../../../mocks/browser/angular';
import '../../../mocks/browser/promise';
import {stubStore}    from '../../../mocks/isem/variable-array-store';
import {stubRenderer} from '../../../mocks/isem/network-diagram-renderer';

/* mocking */
import {
  Controller as ControllerStatic,
  Definition
} from '../../../../app/src/views/network-diagram/root';
var mockRootScope, stubRootScope, mockScope;
let Controller = (() => {
  mockRootScope = {
    $broadcast: () => {}
  };
  stubRootScope = {
    $broadcast: sinon.stub(mockRootScope, '$broadcast')
  };
  mockScope = {};
  return new ControllerStatic(mockRootScope, mockScope, {},global.setTimeout);
})();

describe('NetworkDiagramRoot', () => {
  describe('Controller#subscribe()', () => {
    beforeEach(() => {
      resetAll(stubStore);
      resetAll(stubRenderer);
      Controller.subscribe();
    });

    it('should be called Store#addListener()', () => {
      assert(stubStore.addListener.callCount === 1);
    });

    it('should be called Renderer#addListener()', () => {
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

    it('should be set to $scope', (done) => {
      promise.then(() => {
        assert(Controller.$scope.variableArray === 'dummyVariableArray');
        done();
      });
    });
  });

  describe('Definition.ddo()', () => {
    it('should be returned the field of controllerAs including the correct name', () => {
      assert(Definition.ddo().controllerAs === 'Controller');
    });
  });

});