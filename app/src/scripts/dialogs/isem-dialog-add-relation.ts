'use strict';
import angular = require('angular');
import app = require('../app');

function DialogAddRelationDDO() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.dialogs + 'isem-dialog-add-relation.html'
  }
}

angular.module(app.appName).directive('isemDialogAddRelation', DialogAddRelationDDO);
