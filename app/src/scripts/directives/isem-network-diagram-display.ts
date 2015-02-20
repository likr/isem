'use strict';
import angular = require('angular');
import app = require('../app');

function ddo() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-network-diagram-display.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramDisplay', ddo);
