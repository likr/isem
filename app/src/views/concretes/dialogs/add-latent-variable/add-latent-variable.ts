'use strict';
import Injector = require('../../../../scripts/injector');
var angular = Injector.angular();
var app     = Injector.app();

interface Scope extends ng.IScope {
  dialog: any;
  variableName: string;
}

export class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    //
  }

  /**
   * @param {string} v - variable
   */
  add(v: string) {
    this.$rootScope.$broadcast('isem:addVariable', v);
    this.$scope.dialog.close();
  }
}
export class Definition {
  static link($scope: Scope, _: any, __: any, cwModal: any) {
    $scope.dialog = cwModal.dialog;
  }

  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'AddLatentVariable',
      link: Definition.link,
      require: '^cwModal',
      restrict: 'E',
      scope: {}, // use isolate scope
      templateUrl: app.viewsDir.newDialogs + 'add-latent-variable/add-latent-variable.html'
    }
  }
}

angular.module(app.appName).directive('isemDialogAddLatentVariable', Definition.ddo);