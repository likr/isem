'use strict';
var assert    = require('power-assert').customize({output: {maxDepth: 2}});
var sinon     = require('sinon');
var constants = require('../../../app/src/scripts/constants');

var stubRootScope = require('../../mocks/browser/angular').stubRootScope;

var Dispatcher = require('../../../app/src/scripts/modules/network-diagram-dispatcher').singleton;

describe('NetworkDiagramDispatcher', () => {
  // no tests
});