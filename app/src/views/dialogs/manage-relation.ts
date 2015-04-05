'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var constants = injector.constants();
var localized = injector.localized();
var log       = injector.log();

var directiveName = 'isemDialogManageRelation';

interface Scope extends ng.IScope {
  dialog: any;
  variableArray: Array<typeVertex.Props>;
  edgeArray: [number, number][];
  managedEdgeList: any;
  vertexId: number;

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
    this.$scope.edgeArray     = this.$scope.dialog.data.edgeArray;
    this.$scope.variableArray = this.$scope.dialog.data.variableArray;
    this.$scope.vertexId      = this.$scope.dialog.data.vertexId;

    this.$scope.localized = localized(this.$scope.locale(), directiveName);

    this.addKeyboardHandler();
    this.generateManagedEdgeList();
  }

  /**
   * @returns {void}
   */
  private addKeyboardHandler() {
    this.$scope.dialog.onKeyDown((e: KeyboardEvent) => {
      if (e.keyCode === 13/* enter */) {
        // noop
        // To prevent erroneous operation
        //
        // this.remove();
      }
      if (e.keyCode === 27/* esc */) {
        this.cancel();
      }
    });
  }

  /**
   * @returns {[number, number][]}
   */
  private generateManagedEdgeList() {
    var filtered = (() => {
      // I do not think of a good variable name... sorry!
      var send    = this.filterRelatedEdge();
      var receive = this.filterRelatedEdge(true);
      return send.concat(receive);
    })();

    var labels: any = {};
    this.$scope.variableArray.forEach((v) => {
      labels[v.vertexId] = v.label;
    });

    this.$scope.managedEdgeList = filtered.map((edge: [number, number]) => {
      return {
        uLabel:   labels[edge[0]],
        u:        edge[0],
        vLabel:   labels[edge[1]],
        v:        edge[1],
        selected: false
      };
    });
  }

  /**
   * @params {boolean} opposite
   * @returns {[number, number][]}
   */
  private filterRelatedEdge(opposite: boolean = false): [number, number][] {
    log.trace(log.t(), __filename, '#filterRelatedEdge()', this.$scope.edgeArray, opposite);

    if (this.$scope.edgeArray == null) {
      log.info(log.t(), __filename, 'edgeArray is empty');
      return [];
    }

    var anchored = opposite? 1 : 0;
    return this.$scope.edgeArray.filter((edge: [number, number]) => {
      return this.$scope.vertexId === edge[anchored];
    });
  }

  /**
   * @returns {void}
   */
  remove() {
    log.debug(log.t(), __filename, '#remove()', arguments);
    var removeTarget = this.$scope.managedEdgeList.filter((row: any) => {
      return row.selected;
    });
    this.$rootScope.$broadcast(constants.REMOVE_RELATION, removeTarget);
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

export function open<T>(data: T) {
  log.debug(log.t(), __filename, 'open()', arguments);
  var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
  var Dialog: cw.DialogStatic = rootElement.injector().get('Dialog');

  var dialog = new Dialog<T>({
    template: '<isem-dialog-manage-relation isem-io-locale="$root.locale" />',
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
      templateUrl: app.viewsDir.dialogs + 'manage-relation.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);