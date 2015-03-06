'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import Injector = require('../../scripts/injector');
var angular = Injector.angular();
var log     = Injector.log();

import IsemInjector = require('../../scripts/isem-injector');
var AddRelation = IsemInjector.AddRelation();
var app         = IsemInjector.app();
var constants   = IsemInjector.constants();
var Renderer    = IsemInjector.NetworkDiagramRenderer();
var Store       = IsemInjector.VariableArrayStore();
var styles      = IsemInjector.styles();

var directiveName = 'isemNetworkDiagram';

interface Scope extends ng.IScope {
  variableArray: Array<typeVertex.Instance>;
}

declare var listenerWithErrorType: (ev: ng.IAngularEvent, err?: any, ...args: any[]) => any;
export class Controller {
  private _changeCallback:                 typeof listenerWithErrorType;
  private _clickAddRelationButtonCallback: typeof listenerWithErrorType;
  private _clickVertexCallback:            typeof listenerWithErrorType;

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
    this._changeCallback                 = this.changeCallback();
    this._clickAddRelationButtonCallback = this.clickAddRelationButtonCallback();
    this._clickVertexCallback            = this.clickVertexCallback();
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    log.trace(log.t(), __filename, '#subscribe()');
    Store.addListenerToChange(this._changeCallback);
    Renderer.addListenerToClickAddRelationButton(this._clickAddRelationButtonCallback);
    Renderer.addListenerToClickVertex(this._clickVertexCallback);
  }

  /**
   * @returns {Function}
   */
  private changeCallback(): typeof listenerWithErrorType {
    return (_, err) => {
      log.trace(log.t(), __filename, '#changeCallback()');
      if (err) {
        log.error(err);
        return;
      }

      // This requires JS native setTimeout because needs forced to $apply
      setTimeout(() => {
        this.$scope.$apply(() => {
          this.$scope.variableArray = Store.variableArray;
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
  private clickVertexCallback(): typeof listenerWithErrorType {
    return (_, err, vertexId) => {
      log.trace(log.t(), __filename, '#clickVertexCallback()', vertexId);
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
