'use strict';
var assert    = require('power-assert').customize({output: {maxDepth: 2}});
var sinon     = require('sinon');
var constants = require('../../../../app/src/scripts/constants');

require('../../../mocks/browser/angular');
var stubD3         = require('../../../mocks/browser/d3').stub;
var stubDocument   = require('../../../mocks/browser/document').stub;
var stubFileReader = require('../../../mocks/browser/file-reader').stub;

var ImportFile = require('../../../../app/src/views/dialogs/import-file');
var ControllerStatic = ImportFile.Controller;

var mockRootScope, stubRootScope, mockScope, stubScope;
var Controller = (() => {
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
var Definition = ImportFile.Definition;

describe('DialogImportFile', () => {
  describe('Controller', () => {
    describe('#importFile()', () => {
      var files = ['dummy', null];
      before(() => {
        stubDocument.getElementById.withArgs('file-input').returns({files: files});
        Controller.importFile();
      });

      it('should give the correct value to arg[0] of readAsText()', () => {
        assert(stubFileReader.readAsText.getCall(0).args[0] === files[0]);
      });

      it('should give the correct value to arg[1] of readAsText()', () => {
        // utf-8 is used as a default
        assert(stubFileReader.readAsText.getCall(0).args[1] === 'utf-8');
      });

      it('should do close()', () => {
        assert(stubScope.dialog.close.callCount === 1);
      });
    });

    describe('#fileReaderOnLoad()', () => {
      var event = {target: {result: 'dummyResult'}};
      before(() => {
        stubD3.csv.parse.withArgs('dummyResult').returns('dummyParsed');
        Controller.fileReaderOnLoad()(event);
      });

      it('should give the event name to arg[0] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[0] === constants.IMPORT_FILE);
      });

      it('should give the value to arg[1] of $broadcast()', () => {
        assert(stubRootScope.$broadcast.getCall(0).args[1] === 'dummyParsed');
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