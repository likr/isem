'use strict';
import angular = require('angular');
import app = require('../app');

interface DialogAddLatentVariableScope extends ng.IScope {
  variableName: string
}

class DialogAddLatentVariableController {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: DialogAddLatentVariableScope
  ) {
    //
  }

  /**
   * @param {string} v - variable
   */
  add(v: string) {
    console.log('DialogAddLatentVariableController#add()', v);
    this.$rootScope.$broadcast('isem:addVariable', v);
  }
}

function DialogAddLatentVariableDDO() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.dialogs + 'isem-dialog-add-latent-variable.html',
    controller: DialogAddLatentVariableController,
    controllerAs: 'AddLatentVariable',
    scope: {} // use isolate scope
  }
}

angular.module(app.appName).directive('isemDialogAddLatentVariable', DialogAddLatentVariableDDO);
