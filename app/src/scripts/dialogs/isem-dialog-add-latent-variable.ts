'use strict';
import angular = require('angular');
import app = require('../app');

function DialogAddLatentVariableDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-dialog-add-latent-variable.html'
  }
}

angular.module(app.appName).directive('isemDialogAddLatentVariable', DialogAddLatentVariableDDO);
