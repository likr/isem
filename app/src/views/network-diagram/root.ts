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
var styles    = IsemInjector.styles();

var AddRelation    = IsemInjector.AddRelation();
var ManageRelation = IsemInjector.ManageRelation();

var directiveName = 'isemNetworkDiagram';

interface Scope extends ng.IScope {
  variableArray:  Array<typeVertex.Instance>;
  edgeArray:      [number, number][];
  attributeArray: Array<{name: string; value: number}>;
}

declare var listenerWithErrorType: (ev: ng.IAngularEvent, err?: any, ...args: any[]) => any;
export class Controller {
  private _storeChangeCallback:    typeof listenerWithErrorType;
  private _rendererChangeCallback: typeof listenerWithErrorType;

  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    log.trace(log.t(), __filename, 'constructor');
    // Callbacks must be stored once in the variable
    // for give to removeListener()
    this._storeChangeCallback    = this.storeChangeCallback();
    this._rendererChangeCallback = this.rendererChangeCallback();
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    log.trace(log.t(), __filename, '#subscribe()');
    Store.addListenerToChange(this._storeChangeCallback);
    Renderer.addListenerToChange(this._rendererChangeCallback);
  }

  /**
   * @returns {Function}
   */
  private storeChangeCallback(): typeof listenerWithErrorType {
    return (_, err) => {
      log.trace(log.t(), __filename, '#storeChangeCallback()');
      if (err) {
        log.error(err);
        return;
      }

      // This requires JS native setTimeout because needs forced to $apply
      setTimeout(() => {
        this.$scope.$apply(() => {
          this.$scope.variableArray = Store.variableArray;
          this.$scope.edgeArray     = Store.edgeArray;
          this.$rootScope.$broadcast(constants.UPDATE_DIAGRAM, Store.graph);
          this.$rootScope.$broadcast(constants.ADD_EGM_HANDLERS, this.egmHandlers());
        });
      }, 0); // Immediate execution
    };
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

  /**
   * @returns {Function}
   */
  private rendererChangeCallback(): typeof listenerWithErrorType {
    return (_, err) => {
      log.trace(log.t(), __filename, '#rendererChangeCallback()');
      if (err) {
        log.error(err);
        return;
      }

      // This requires JS native setTimeout because needs forced to $apply
      setTimeout(() => {
        this.$scope.$apply(() => {
          this.$scope.attributeArray = Renderer.attributeArray;
        });
      }, 0);
    };
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
