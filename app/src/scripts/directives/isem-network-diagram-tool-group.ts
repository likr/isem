'use strict';
import angular = require('angular');
import app = require('../app');

function NetworkDiagramToolGroupDDO() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-network-diagram-tool-group.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramToolGroup', NetworkDiagramToolGroupDDO);
