'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var localized = IsemInjector.localized();

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
    this.initLocalizedLabel(this.$scope.locale());
  }

  /**
   * @param {string} locale
   * @returns {void}
   */
  private initLocalizedLabel(locale: string) {
    this.$scope.localized = localized(locale, directiveName);
  }

  /**
   * @param {string} v - variable
   * @returns {void}
   */
  add(v: string) {
    this.$rootScope.$broadcast(constants.ADD_LATENT_VARIABLE, v);
    this.$scope.dialog.close();
  }

  /**
   * @returns {void}
   */
  cancel() {
    this.$scope.dialog.close();
  }
}

export function open() {
  var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
  var Dialog = rootElement.injector().get('Dialog');

  var dialog = new Dialog({
    template: '<isem-dialog-add-latent-variable isem-io-locale="$root.locale" />'
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