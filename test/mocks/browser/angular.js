'use strict';
var sinon = require('sinon');
var Injector = require('../../../app/src/scripts/injector');

function mockAngular() {
  // do nothing
}

mockAngular.module = () => {
  return {
    config: () => {},
    directive: () => {}
  };
};

sinon.stub(Injector, 'angular').returns(mockAngular);

module.exports.mock = mockAngular;
