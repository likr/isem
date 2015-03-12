'use strict';
/* Use only typing */
import typeVertex   = require('../../scripts/modules/vertex');
import typeRenderer = require('../../scripts/modules/network-diagram-renderer');

import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var constants = injector.constants();
var log       = injector.log();

/* stores */
var Renderer = injector.NetworkDiagramRenderer();
var Store    = injector.VariableArrayStore();

/* dialogs */
var AddRelation    = injector.AddRelation();
var ManageRelation = injector.ManageRelation();
var RenameVariable = injector.RenameVariable();

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
    private $scope: Scope,
    private $timeout: ng.ITimeoutService
  ) {
    log.trace(log.t(), __filename, 'constructor');
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    log.trace(log.t(), __filename, '#subscribe()');

    this.storeDisposer    = Store   .addListener(this.storeChangeHandler.bind(this));
    this.rendererDisposer = Renderer.addListener(this.rendererChangeHandler.bind(this));
  }

  /**
   * @param {*} e - event non-use
   * @param {*} err - error
   * @returns {void}
   */
  private storeChangeHandler(e: any, err?: any) {
    log.trace(log.t(), __filename, '#storeChangeHandler()');
    if (err) {
      log.error(log.t(), __filename, err.message);
      return;
    }

    // This requires $timeout because needs forced to $apply
    this.$timeout(() => {
      this.$scope.variableArray = Store.variableArray;
      this.$scope.edgeArray     = Store.edgeArray;
      this.$rootScope.$broadcast(constants.UPDATE_DIAGRAM, Store.graph);
      this.$rootScope.$broadcast(constants.ADD_EGM_HANDLERS, this.egmHandlers());
    }, 0);
  }

  /**
   * @param {*} e - event non-use
   * @param {*} err - error
   * @returns {void}
   */
  private rendererChangeHandler(e: any, err?: any) {
    log.trace(log.t(), __filename, '#rendererChangeHandler()');
    if (err) {
      log.error(log.t(), __filename, err.message);
      return;
    }

    // This requires $timeout because needs forced to $apply
    this.$timeout(() => {
      this.$scope.attributeArray = Renderer.attributeArray;
    });
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
      }, {
        icon: '',
        onClick: this.renameVariableButtonHandler.bind(this)
      }
    ];

    return {
      onClickVertex: this.clickVertexHandler.bind(this),
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
   * @param {Vertex.Props} d
   * @param {number} vertexId
   * @returns {void}
   */
  private renameVariableButtonHandler(d: typeVertex.Props, vertexId: number) {
    log.trace(log.t(), __filename, '#renameVariableButtonHandler()', vertexId);

    var data = {
      vertexId: vertexId,
      variableName: d.label
    };
    RenameVariable.open(data);
  }

  /**
   * @returns {void}
   */
  private clickVertexHandler(d: typeVertex.Props, vertexId: number) {
    log.trace(log.t(), __filename, '#clickVertexHandler()', vertexId);
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
