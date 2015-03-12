'use strict';
var sinon = require('sinon');
var injector = require('../../../app/src/scripts/injector');

sinon.stub(injector, 'Promise').returns(Promise);