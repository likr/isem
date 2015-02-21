'use strict';
import angular = require('angular');
import app = require('../app');

function NetworkDiagramValueGroupDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-network-diagram-value-group.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramValueGroup', NetworkDiagramValueGroupDDO);
