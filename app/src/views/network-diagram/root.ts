'use strict';
import typeVertex   = require('../../scripts/modules/vertex');
import typeRenderer = require('../../scripts/modules/network-diagram-renderer');

import Injector = require('../../scripts/injector');
var angular = Injector.angular();
var log     = Injector.log();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var Renderer  = IsemInjector.NetworkDiagramRenderer();
var Store     = IsemInjector.VariableArrayStore();

var AddRelation    = IsemInjector.AddRelation();
var ManageRelation = IsemInjector.ManageRelation();

var directiveName = 'isemNetworkDiagram';

interface Scope extends ng.IScope {
  variableArray:  Array<typeVertex.Instance>;
  edgeArray:      [number, number][];
  attributeArray: Array<{name: string; value: number}>;
}

declare var disposer: {dispose(): void};
export class Controller {
  private storeDisposer:    typeof disposer;
  private rendererDisposer: typeof disposer;

  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    log.trace(log.t(), __filename, 'constructor');
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    log.trace(log.t(), __filename, '#subscribe()');

    this.storeDisposer    = Store.addListenerToChange(this.storeChangeCallback.bind(this));
    this.rendererDisposer = Renderer.addListenerToChange(this.rendererChangeCallback.bind(this));
  }

  /**
   * @param {*} e - event non-use
   * @param {*} err - error
   * @returns {void}
   */
  private storeChangeCallback(e: any, err?: any) {
    log.trace(log.t(), __filename, '#storeChangeCallback()');
    if (err) {
      log.error(log.t(), __filename, err.message);
      return;
    }

    var apply = () => {
      this.$scope.$apply(() => {
        this.$scope.variableArray = Store.variableArray;
        this.$scope.edgeArray     = Store.edgeArray;
        this.$rootScope.$broadcast(constants.UPDATE_DIAGRAM, Store.graph);
        this.$rootScope.$broadcast(constants.ADD_EGM_HANDLERS, this.egmHandlers());
      });
    };

    // This requires JS native setTimeout because needs forced to $apply
    // Immediate execution
    setTimeout(apply, 0);
  }

  /**
   * @param {*} e - event non-use
   * @param {*} err - error
   * @returns {void}
   */
  private rendererChangeCallback(e: any, err?: any) {
    log.trace(log.t(), __filename, '#rendererChangeCallback()');
    if (err) {
      log.error(log.t(), __filename, err.message);
      return;
    }

    var apply = () => {
      this.$scope.$apply(() => {
        this.$scope.attributeArray = Renderer.attributeArray;
      });
    };

    // This requires JS native setTimeout because needs forced to $apply
    // Immediate execution
    setTimeout(apply, 0);
  }

  /**
   * @returns {Renderer.EgmHandlers}
   */
  private egmHandlers(): typeRenderer.EgmHandlers {
    var vertexButtons: egrid.core.VertexButton[] = [
      {
        icon: '',
        onClick: this.addRelationButtonHandler.bind(this)
      }, {
        icon: '',
        onClick: this.manageRelationButtonHandler.bind(this)
      }
    ];

    return {
      onClickVertex: this.onClickVertex.bind(this),
      vertexButtons: vertexButtons
    };
  }

  /**
   * @param {Vertex.Props} d
   * @param {number} vertexId
   * @returns {void}
   */
  private addRelationButtonHandler(d: typeVertex.Props, vertexId: number) {
    log.trace(log.t(), __filename, '#addRelationButtonHandler()', vertexId);

    var data = {
      vertexId: vertexId,
      variableArray: this.$scope.variableArray
    };
    AddRelation.open<typeof data>(data);
  }

  /**
   * @param {Vertex.Props} d
   * @param {number} vertexId
   * @returns {void}
   */
  private manageRelationButtonHandler(d: typeVertex.Props, vertexId: number) {
    log.trace(log.t(), __filename, '#manageRelationButtonHandler()', vertexId);

    var data = {
      vertexId: vertexId,
      variableArray: this.$scope.variableArray,
      edgeArray: this.$scope.edgeArray
    };
    ManageRelation.open<typeof data>(data);
  }

  /**
   * @returns {void}
   */
  private onClickVertex(d: typeVertex.Props, vertexId: number) {
    log.trace(log.t(), __filename, '#onClickVertex()', vertexId);
    // noop
  }
}

export class Definition {
  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.networkDiagram + 'root.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
