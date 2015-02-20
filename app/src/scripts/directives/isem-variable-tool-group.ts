'use strict';
import angular = require('angular');
import app = require('../app');

function VariableToolGroupDDO() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-variable-tool-group.html'
  }
}

angular.module(app.appName).directive('isemVariableToolGroup', VariableToolGroupDDO);
