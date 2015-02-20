'use strict';
import angular = require('angular');
import app = require('../app');

function ScreenNetworkDiagramDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-screen-network-diagram.html'
  }
}

angular.module(app.appName).directive('isemScreenNetworkDiagram', ScreenNetworkDiagramDDO);
