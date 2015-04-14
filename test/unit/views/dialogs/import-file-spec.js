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
    encoding: 'utf-8'
  };
  stubScope = {
    dialog: {
      close: sinon.stub(mockScope.dialog, 'close')
    }
  };
  return new ControllerStatic(mockRootScope, mockScope);
})();

describe('DialogImportFile', () => {
  describe('Controller', () => {
    describe('#importFile()', () => {
      var files = ['dummy', null];
      before(() => {
        stubDocument.getElementById.withArgs('file-input').returns({files: files});
        Controller.importFile();
      });

      it('should be given the correct value to args[0] of readAsText()', () => {
        assert(stubFileReader.readAsText.getCall(0).args[0] === files[0]);
      });

      it('should be given the correct value to arg[1] of readAsText()', () => {
        // utf-8 is used as a default
        assert(stubFileReader.readAsText.getCall(0).args[1] === 'utf-8');
      });

      it('should be called close()', () => {
        assert(stubScope.dialog.close.callCount === 1);
      });
    });

    describe('#fileReaderOnLoad()', () => {
      var event = {target: {result: 'dummyResult'}};
      before(() => {
        stubD3.csv.parse.withArgs('dummyResult').returns('dummyParsed');
        Controller.fileReaderOnLoad()(event);
      });

      it('should be given the event name to args[0] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[0] === constants.IMPORT_FILE);
      });

      it('should be given the value to arg[1] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[1] === 'dummyParsed');
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
