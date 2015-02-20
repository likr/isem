'use strict';
import angular = require('angular');
import app = require('../app');

function ddo() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.dialogs + 'isem-dialog-import-file.html'
  }
}

angular.module(app.appName).directive('isemDialogImportFile', ddo);
