'use strict';
import angular = require('angular');
import app = require('../app');

function VariableDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-variable.html'
  }
}

angular.module(app.appName).directive('isemVariable', VariableDDO);
