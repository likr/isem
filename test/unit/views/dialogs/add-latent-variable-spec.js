'use strict';
var powerAssert = require('power-assert');
var assert = powerAssert.customize({output: {maxDepth: 2}});
var sinon = require('sinon');

var Injector = require('../../../../app/src/scripts/injector');
var stub = {
  app:     sinon.stub(Injector, 'app').returns({}),
  angular: sinon.stub(Injector, 'angular').returns({'module': () => {return {directive: () => {}}}})
};
var AddLatentVariable = require('../../../../app/src/views/concretes/dialogs/add-latent-variable/add-latent-variable');


describe('DialogAddLatentVariable', () => {
  it('Runnable', () => {
    assert(true === true);
  });
});