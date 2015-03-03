'use strict';
import angular = require('angular');
import app = require('../../scripts/app');

function ddo() {
  return {
    restrict: 'A',
    templateUrl: app.viewsDir.networkDiagram + 'sub-column.html',
    scope: {
      variableArray: '=isemIoVariableArray'
    }
  }
}

angular.module(app.appName).directive('isemNetworkDiagramSubColumn', ddo);
