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
    // DO NOT call #init() here because $scope hasn't been set yet.
  }

  init() {
    log.trace(log.t(), __filename, '#init()', this.$scope);

    this.addKeyboardHandler();
    this.$scope.localized = localized(this.$scope.locale(), directiveName);
  }

  /**
   * @returns {void}
   */
  private addKeyboardHandler() {
    this.$scope.dialog.onKeyDown((e: KeyboardEvent) => {
      if (e.keyCode === 13/* enter */) {
        this.add(this.$scope.variableName);
      }
      if (e.keyCode === 27/* esc */) {
        this.cancel();
      }
    });
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
  static link($scope: Scope, _: any, __: any, controllers: any) {
    var cwModal = controllers[0];
    var self    = controllers[1];

    $scope.dialog = cwModal.dialog;
    self.init();
  }

  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      link: Definition.link,
      require: ['^cwModal', directiveName],
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.dialogs + 'add-latent-variable.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);