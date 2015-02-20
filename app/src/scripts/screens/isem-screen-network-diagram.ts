'use strict';
import angular = require('angular');
import app = require('../app');

function ScreenNetworkDiagramDDO() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.screens + 'isem-screen-network-diagram.html'
  }
}

angular.module(app.appName).directive('isemScreenNetworkDiagram', ScreenNetworkDiagramDDO);
