'use strict';
import constants from '../../../../app/src/scripts/constants';
import powerAssert from 'power-assert';
import sinon from 'sinon';
import {allReset} from '../../../utils';
const assert = powerAssert.customize({output: {maxDepth: 2}});

/* stubbing */
import '../../../mocks/browser/angular';
import {stubDispatcher} from '../../../mocks/isem/network-diagram-dispatcher';
import {mockEgrid, stubEgm} from '../../../mocks/browser/egrid-core';

import {singleton as Renderer} from '../../../../app/src/scripts/modules/network-diagram-renderer'

describe('NetworkDiagramRenderer', () => {
  beforeEach(() => {
    allReset(stubDispatcher);
    allReset(stubEgm);
  });

  describe('#init()', () => {
    beforeEach(() => {
      Renderer.init();
    });

    it('should be done Dispatcher#addHandlers()', () => {
      assert(stubDispatcher.addHandlers.callCount === 1);
    });
  });

  describe('#addEgmHandlers()', () => {
    context('when normal', () => {
      beforeEach(() => {
        const handlers = {
          onClickVertex: 'onClickVertex',
          vertexButtons: ['button1', 'button2']
        };
        Renderer.egm = mockEgrid.core.egm;
        Renderer.addEgmHandlers(null, handlers);
      });

      it('should be set to egm.onClickVertex()', () => {
        assert(stubEgm.onClickVertex.getCall(0).args[0] === 'onClickVertex');
      });

      it('should be set to egm.vertexButtons()', () => {
        assert.deepEqual(stubEgm.vertexButtons.getCall(0).args[0], ['button1', 'button2']);
      });
    });

    context('when not exists egm', () => {
      var stubPublish;
      beforeEach(() => {
        stubPublish = sinon.stub(Renderer, 'publish');
        Renderer.egm = void 0;
        Renderer.addEgmHandlers(null, null);
      });

      afterEach(() => {
        stubPublish.restore();
      });

      it('should be given the error to args[0] of #publish()', () => {
        assert(stubPublish.getCall(0).args[0] instanceof Error);
      });

      it('should NOT be called egm#onClickVertex()', () => {
        assert(stubEgm.onClickVertex.callCount === 0);
      });
    });
  });
});