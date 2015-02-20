'use strict';
import angular = require('angular');
import app = require('../app');

function ddo() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.dialogs + 'isem-dialog-add-relation.html'
  }
}

angular.module(app.appName).directive('isemDialogAddRelation', ddo);
