'use strict';
import angular = require('angular');
import app = require('../app');

function NetworkDiagramDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-network-diagram.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagram', NetworkDiagramDDO);
