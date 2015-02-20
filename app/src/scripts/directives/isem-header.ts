'use strict';
import angular = require('angular');
import app = require('../app');

function HeaderDDO() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-header.html'
  }
}

angular.module(app.appName).directive('isemHeader', HeaderDDO);
