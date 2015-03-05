'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var AddRelation = IsemInjector.AddRelation();
var app         = IsemInjector.app();
var constants   = IsemInjector.constants();
var Logger      = IsemInjector.Logger();
var Renderer    = IsemInjector.NetworkDiagramRenderer();
var Store       = IsemInjector.VariableArrayStore();
var styles      = IsemInjector.styles();

interface Scope extends ng.IScope {
  _variableArray: string[];
  _graph: egrid.core.Graph;
}

declare var listenerWithErrorType: (ev: ng.IAngularEvent, err?: any, ...args: any[]) => any;
export class Controller {
  private _changeCallback: typeof listenerWithErrorType;
  private _clickAddRelationButtonCallback: typeof listenerWithErrorType;

  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    // Callbacks must be stored once in the variable
    // for give to removeListener()
    this._changeCallback = this.changeCallback();
    this._clickAddRelationButtonCallback = this.clickAddRelationButtonCallback();
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    Store.addListenerToChange(this._changeCallback);
    Renderer.addListenerToClickAddRelationButton(this._clickAddRelationButtonCallback);
  }

  /**
   * @returns {Function}
   */
  private changeCallback(): typeof listenerWithErrorType {
    return (_, err) => {
      if (err) {
        Logger.error(err);
        return;
      }

      // This requires JS native setTimeout because needs forced to $apply
      setTimeout(() => {
        this.$scope.$apply(() => {
          this.$scope._variableArray = Store.variableArray;
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
      var data = {vertexId: vertexId};
      AddRelation.open<typeof data>(data);
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

angular.module(app.appName).directive('isemNetworkDiagram', Definition.ddo);
