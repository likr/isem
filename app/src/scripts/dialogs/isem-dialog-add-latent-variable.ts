'use strict';
import angular = require('angular');
import app = require('../app');

interface DialogAddLatentVariableScope extends ng.IScope {
  dialog: any;
  variableName: string;
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
    this.$scope.dialog.close();
  }
}

function link($scope: DialogAddLatentVariableScope, _: any, __: any, cwModal: any) {
  $scope.dialog = cwModal.dialog;
}

function ddo() {
  return {
    controller: DialogAddLatentVariableController,
    controllerAs: 'AddLatentVariable',
    link: link,
    require: '^cwModal',
    restrict: 'E',
    scope: {}, // use isolate scope
    templateUrl: app.viewsDir.dialogs + 'isem-dialog-add-latent-variable.html'
  }
}

angular.module(app.appName).directive('isemDialogAddLatentVariable', ddo);
export = DialogAddLatentVariableController;