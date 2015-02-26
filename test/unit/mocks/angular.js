'use strict';
var sinon = require('sinon');
var Injector = require('../../../app/src/scripts/injector');

var mockAngular = {'module': () => {
  return {
    config: () => {},
    directive: () => {}
  };
}};

var stubAngular = {
  angular: sinon.stub(Injector, 'angular').returns(mockAngular)
};

module.exports.mock = mockAngular;
module.exports.stub = stubAngular;