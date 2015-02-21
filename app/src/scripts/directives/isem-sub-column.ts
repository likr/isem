'use strict';
import angular = require('angular');
import app = require('../app');

function SubColumnDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-sub-column.html'
  }
}

angular.module(app.appName).directive('isemSubColumn', SubColumnDDO);
