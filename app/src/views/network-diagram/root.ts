'use strict';
import typeVertex = require('../../scripts/modules/vertex');

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
  /* Store */
  private _storeChangeCallback: typeof listenerWithErrorType;

  /* Renderer */
  private _clickAddRelationButtonCallback: typeof listenerWithErrorType;
  private _clickManageRelationCallback:    typeof listenerWithErrorType;
  private _clickVertexCallback:            typeof listenerWithErrorType;
  private _rendererChangeCallback:         typeof listenerWithErrorType;

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
    this._storeChangeCallback = this.storeChangeCallback();

    this._clickAddRelationButtonCallback = this.clickAddRelationButtonCallback();
    this._clickManageRelationCallback    = this.clickManageRelationCallback();
    this._clickVertexCallback            = this.clickVertexCallback();
    this._rendererChangeCallback         = this.rendererChangeCallback();
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    log.trace(log.t(), __filename, '#subscribe()');
    Store.addListenerToChange(this._storeChangeCallback);
    Renderer.addListenerToChange                (this._rendererChangeCallback);
    Renderer.addListenerToClickAddRelationButton(this._clickAddRelationButtonCallback);
    Renderer.addListenerToClickManageRelation   (this._clickManageRelationCallback);
    Renderer.addListenerToClickVertex           (this._clickVertexCallback);
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
        });
      }, 0); // Immediate execution
    };
  }

  /**
   * @returns {Function}
   */
  private clickAddRelationButtonCallback(): typeof listenerWithErrorType {
    return (_, err, vertexId) => {
      log.trace(log.t(), __filename, '#clickAddRelationButtonCallback()');
      if (err) {
        log.error(err);
        return;
      }

      var data = {
        vertexId: vertexId,
        variableArray: this.$scope.variableArray
      };
      AddRelation.open<typeof data>(data);
    };
  }

  /**
   * @returns {Function}
   */
  private clickManageRelationCallback(): typeof listenerWithErrorType {
    return (_, err, vertexId) => {
      log.trace(log.t(), __filename, '#clickManageRelationCallback()');
      if (err) {
        log.error(err);
        return;
      }

      var data = {
        vertexId: vertexId,
        variableArray: this.$scope.variableArray,
        edgeArray: this.$scope.edgeArray
      };
      ManageRelation.open<typeof data>(data);
    };
  }

  /**
   * @returns {Function}
   */
  private clickVertexCallback(): typeof listenerWithErrorType {
    return (_, err, vertexId) => {
      log.trace(log.t(), __filename, '#clickVertexCallback()', vertexId);
      if (err) {
        log.error(err);
        return;
      }
      // Do nothing
    };
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
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        // positioning
        position:     'absolute',
        top:          styles.isemHeader.height,
        'overflow-y': 'scroll',
        // size
        width: '100%',
        height: styles.mainDisplay.height
        // visually
        // none
      });
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
    Definition.styling(tElement);
    return () => {}; // link is do nothing
  }

  static ddo() {
    return {
      compile: Definition.compile,
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
