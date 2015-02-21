'use strict';
import angular = require('angular');
import app = require('../app');

function HeaderDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-header.html'
  }
}

angular.module(app.appName).directive('isemHeader', HeaderDDO);
