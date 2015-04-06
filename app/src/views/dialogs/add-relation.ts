'use strict';
import typeVertex = require('../../scripts/modules/vertex');
import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var constants = injector.constants();
var localized = injector.localized();
var log       = injector.log();

var directiveName = 'isemDialogAddRelation';

interface Scope extends ng.IScope {
  dialog: any;
  direction: Direction;
  variableArray: Array<typeVertex.Props>;
  vertexIdX: number;
  vertexIdY: number;

  localized: any;
  locale(): string;
}

export enum Direction {
  xToY,
  mutual,
  yToX
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
    this.$scope.direction     = Direction.xToY;
    this.$scope.variableArray = this.$scope.dialog.data.variableArray;
    this.$scope.vertexIdX     = this.$scope.dialog.data.vertexId;

    this.addKeyboardHandler();

    this.$scope.localized = localized(this.$scope.locale(), directiveName);
  }

  /**
   * @returns {void}
   */
  private addKeyboardHandler() {
    this.$scope.dialog.onKeyDown((e: KeyboardEvent) => {
      if (e.keyCode === 13/* enter */) {
        this.add(this.$scope.vertexIdX, this.$scope.vertexIdY, this.$scope.direction);
      }
      if (e.keyCode === 27/* esc */) {
        this.cancel();
      }
    });
  }

  /**
   * @param {*} idX - actually string or number, it needs number
   * @param {*} idY - ditto
   * @param {*} direction - actually string or number, it needs Direction
   */
  add(idX: any, idY: any, direction: any) {
    log.debug(log.t(), __filename, '#add()', arguments);
    var data = {
      idX: parseInt(idX, 10),
      idY: parseInt(idY, 10),
      direction: parseInt(direction, 10)
    };

    if (Object.keys(Direction).indexOf(String(data.direction)) === -1) {
      log.error(log.t(), __filename, 'The value "direction" is an invalid value', data.direction);
      return;
    }

    this.$rootScope.$broadcast(constants.ADD_RELATION, data);
  }

  /**
   * This is alias of #close()
   *
   * @returns {void}
   */
  cancel() {
    log.trace(log.t(), __filename, '#cancel()');
    this.close();
  }

  /**
   * @returns {void}
   */
  close() {
    log.trace(log.t(), __filename, '#close()');
    this.$scope.dialog.close();
  }
}

export function open<T>(data: T) {
  log.debug(log.t(), __filename, 'open()', arguments);
  var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
  var Dialog: cw.DialogStatic = rootElement.injector().get('Dialog');

  var dialog = new Dialog<T>({
    template: '<isem-dialog-add-relation isem-io-locale="$root.locale" />',
    width: 600
  });
  dialog.open(data);
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
      templateUrl: app.viewsDir.dialogs + 'add-relation.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);