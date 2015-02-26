'use strict';
import Injector = require('../../../../scripts/injector');
var angular = Injector.angular();
var app     = Injector.app();

interface DialogAddLatentVariableScope extends ng.IScope {
  dialog: any;
  variableName: string;
}

export class DialogAddLatentVariableController {
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
    templateUrl: app.viewsDir.newDialogs + 'add-latent-variable/add-latent-variable.html'
  }
}

angular.module(app.appName).directive('isemDialogAddLatentVariable', ddo);