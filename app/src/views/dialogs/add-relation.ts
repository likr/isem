'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var localized = IsemInjector.localized();
var Logger    = IsemInjector.Logger();

var directiveName = 'isemDialogAddRelation';

interface Scope extends ng.IScope {
  dialog: any;
  vertexIdX: number;
  vertexIdY: number;
  direction: Direction;

  localized: any;
  locale(): string;
}

enum Direction {
  xToY,
  mutual,
  yTox
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
    Logger.trace(Logger.t(), __filename, 'constructor');
    this.$scope.direction = Direction.xToY;
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
   * @param {*} idX - actually string or number, it needs number
   * @param {*} idY - ditto
   * @param {*} direction - actually string or number, it needs Direction
   */
  add(idX: any, idY: any, direction: any) {
    Logger.debug(Logger.t(), __filename, '#add()', arguments);
    var data = {
      idX: parseInt(idX, 10),
      idY: parseInt(idY, 10),
      direction: parseInt(direction, 10)
    };

    if (Object.keys(Direction).indexOf(String(data.direction)) === -1) {
      throw Error('The value "direction" is an invalid value');
    }

    this.$rootScope.$broadcast(constants.ADD_RELATION, data);
    this.$scope.dialog.close();
  }

  /**
   * @returns {void}
   */
  cancel() {
    Logger.trace(Logger.t(), __filename, '#cancel()');
    this.$scope.dialog.close();
  }
}

export function open<T>(data: T) {
  Logger.debug(Logger.t(), __filename, 'open()', arguments);
  var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
  var Dialog: cw.DialogStatic = rootElement.injector().get('Dialog');

  var dialog = new Dialog<T>({
    template: '<isem-dialog-add-relation isem-io-locale="$root.locale" />'
  });
  dialog.open(data);
}

export class Definition {
  static link($scope: Scope, _: any, __: any, cwModal: any) {
    $scope.dialog = cwModal.dialog;
    $scope.vertexIdX = $scope.dialog.data.vertexId;
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
      templateUrl: app.viewsDir.dialogs + 'add-relation.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);