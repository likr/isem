'use strict';
var sinon = require('sinon');
var Injector = require('../../../app/src/scripts/injector');

function mockDocument() {
  // do nothing
}

mockDocument.getElementById = () => {};
mockDocument.querySelectorAll = () => {};

sinon.stub(Injector, 'document').returns(mockDocument);

var stubDocument = {
  getElementById:   sinon.stub(mockDocument, 'getElementById'),
  querySelectorAll: sinon.stub(mockDocument, 'querySelectorAll')
};

module.exports.mock = mockDocument;
module.exports.stub = stubDocument;