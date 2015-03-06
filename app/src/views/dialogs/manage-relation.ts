'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import Injector = require('../../scripts/injector');
var angular = Injector.angular();
var log     = Injector.log();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var localized = IsemInjector.localized();

var directiveName = 'isemDialogManageRelation';

interface Scope extends ng.IScope {
  dialog: any;
  variableArray: Array<typeVertex.Props>;
  edgeArray: [number, number][];
  managedEdgeList: any;
  u: number;

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
    this.$scope.u             = this.$scope.dialog.data.vertexId;

    this.initLocalizedLabel(this.$scope.locale());
    this.generateManagedEdgeList();
  }

  /**
   * @param {string} locale
   * @returns {void}
   */
  private initLocalizedLabel(locale: string) {
    this.$scope.localized = localized(locale, directiveName);
  }

  /**
   * @returns {[number, number][]}
   */
  private generateManagedEdgeList() {
    var filtered = this.filterRelatedEdge();
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
   * @returns {[number, number][]}
   */
  private filterRelatedEdge(): [number, number][] {
    log.trace(log.t(), __filename, '#filterRelatedEdge()', this.$scope.edgeArray);

    if (this.$scope.edgeArray == null) {
      log.info(log.t(), __filename, 'edgeArray is empty');
      return [];
    }

    return this.$scope.edgeArray.filter((edge: [number, number]) => {
      return this.$scope.u === edge[0];
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
    template: '<isem-dialog-manage-relation isem-io-locale="$root.locale" />'
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