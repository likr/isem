'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');

function ddo() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.newDialogs + 'add-relation/add-relation.html'
  }
}

angular.module(app.appName).directive('isemDialogAddRelation', ddo);
