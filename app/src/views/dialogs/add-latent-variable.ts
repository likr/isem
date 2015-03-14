'use strict';
import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var constants = injector.constants();
var localized = injector.localized();
var log       = injector.log();

var directiveName = 'isemDialogAddLatentVariable';

interface Scope extends ng.IScope {
  dialog: any;
  variableName: string;
  localized: any;
  locale(): string;
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
    log.trace(log.t(), __filename, 'constructor');
    this.$scope.localized = localized(this.$scope.locale(), directiveName);
  }

  /**
   * @param {string} v - variable
   * @returns {void}
   */
  add(v: string) {
    log.trace(log.t(), __filename, '#add()');
    this.$rootScope.$broadcast(constants.ADD_LATENT_VARIABLE, v);
    this.$scope.dialog.close();
  }

  /**
   * @returns {void}
   */
  cancel() {
    log.trace(log.t(), __filename, '#cancel()');
    this.$scope.dialog.close();
  }
}

export function open() {
  log.trace(log.t(), __filename, 'open()');
  var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
  var Dialog = rootElement.injector().get('Dialog');

  var dialog = new Dialog({
    template: '<isem-dialog-add-latent-variable isem-io-locale="$root.locale" />',
    width: 600
  });
  dialog.open();
}

export class Definition {
  static link($scope: Scope, _: any, __: any, cwModal: any) {
    $scope.dialog = cwModal.dialog;
  }

  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      link: Definition.link,
      require: '^cwModal',
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.dialogs + 'add-latent-variable.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);