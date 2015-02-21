'use strict';
import angular = require('angular');
import app = require('../app');

function NetworkDiagramDisplayDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-network-diagram-display.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramDisplay', NetworkDiagramDisplayDDO);
