'use strict';
import angular = require('angular');
import app = require('../app');

function VariableToolGroupDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-variable-tool-group.html'
  }
}

angular.module(app.appName).directive('isemVariableToolGroup', VariableToolGroupDDO);
