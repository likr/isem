'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');

function ddo() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.networkDiagram + 'value-group/value-group.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramValueGroup', ddo);
