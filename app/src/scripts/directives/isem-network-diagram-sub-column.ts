'use strict';
import angular = require('angular');
import app = require('../app');

function ddo() {
  return {
    restrict: 'A',
    templateUrl: app.viewsDir.directives + 'isem-network-diagram-sub-column.html',
    scope: {
      variableArray: '=isemIoVariableArray'
    }
  }
}

angular.module(app.appName).directive('isemNetworkDiagramSubColumn', ddo);
