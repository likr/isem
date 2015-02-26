'use strict';
var sinon = require('sinon');
var Injector = require('../../app/src/scripts/injector');

function mockFileReader() {
  // do nothing
}

mockFileReader.prototype.readAsText = () => {};

sinon.stub(Injector, 'FileReader').returns(mockFileReader);

var stubFileReader = {
  readAsText: sinon.stub(mockFileReader.prototype, 'readAsText')
};

module.exports.mock = mockFileReader;
module.exports.stub = stubFileReader;