'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');

function ddo() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.networkDiagram + 'display/display.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramDisplay', ddo);
