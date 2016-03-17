'use strict';
import constants from '../../../../app/src/scripts/constants';
import powerAssert from 'power-assert';
import sinon from 'sinon';
const assert = powerAssert.customize({output: {maxDepth: 2}});

/* stubbing */
import '../../../mocks/browser/angular';
import {stubD3}         from '../../../mocks/browser/d3';
import {stubDocument}   from '../../../mocks/browser/document';
import {stubFileReader} from '../../../mocks/browser/file-reader';

/* mocking */
import {
  Controller as ControllerStatic,
  Definition
} from '../../../../app/src/views/dialogs/import-file';
var mockRootScope, stubRootScope, mockScope, stubScope, mockQ, stubQ;
let Controller = (() => {
  mockRootScope = {
    $broadcast: () => {}
  };
  stubRootScope = {
    $broadcast: sinon.stub(mockRootScope, '$broadcast')
  };

  mockScope = {
    dialog: {close: () => {}},
    csvEncoding: 'utf-8',
    graphEncoding: 'utf-8'
  };
  stubScope = {
    dialog: {
      close: sinon.stub(mockScope.dialog, 'close')
    }
  };

  mockQ = {
    all: () => ({
      then: (f) => {
        f(['values', 'graph']);
      }
    }),
    defer: () => ({
      promise: 'dummy'
    })
  };
  return new ControllerStatic(mockRootScope, mockScope, mockQ);
})();

describe('DialogImportFile', () => {
  describe('Controller', () => {
    describe('#importFile()', () => {
      var csvFiles = ['dummy-csv', null];
      var graphFiles = ['dummy-graph', null];
      before(() => {
        stubDocument.getElementById.withArgs('csv-file-input').returns({files: csvFiles});
        stubDocument.getElementById.withArgs('graph-file-input').returns({files: graphFiles});
        Controller.projectName = "hoge"
        Controller.importFile();
      });

      it('should be given the correct value to args[0] of readAsText()', () => {
        assert(stubFileReader.readAsText.getCall(0).args[0] === csvFiles[0]);
      });

      it('should be given the correct value to arg[1] of readAsText()', () => {
        // utf-8 is used as a default
        assert(stubFileReader.readAsText.getCall(0).args[1] === 'utf-8');
      });

      it('should be called close()', () => {
        assert(stubScope.dialog.close.callCount === 1);
      });

      it('should be given the event name to args[0] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[0] === constants.IMPORT_FILE);
      });

      it('should be given the value to arg[1] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[1] === 'values');
      });

      it('should be given the value to arg[2] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[2] === 'graph');
      });
    });
  });

  describe('Definition', () => {
    describe('.ddo()', () => {
      it('should be returned the field of require including the other controller', () => {
        assert(Definition.ddo().require[0] === '^cwModal');
      });

      it('should be returned the field of controllerAs including the correct name', () => {
        assert(Definition.ddo().controllerAs === 'Controller');
      });
    });
  });

});
