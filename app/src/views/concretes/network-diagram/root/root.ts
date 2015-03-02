'use strict';
import Injector = require('../../../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var Store     = IsemInjector.VariableArrayStore();
var Renderer  = IsemInjector.NetworkDiagramRenderer();

interface Scope extends ng.IScope {
  _variableArray: string[];
  _graph: egrid.core.Graph;
}

export class Controller {
  private _changeCallback: (e: ng.IAngularEvent, args: any) => any;

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
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    Store.addChangeListener(this._changeCallback);
    Renderer.addChangeListener(void 0);
  }

  /**
   * @returns {Function}
   */
  private changeCallback(): (e: ng.IAngularEvent, err: any) => void {
    return (_, err) => {
      if (err) {
        console.log(err);
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
}

export class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .addClass('container-fluid')
      .css({
        position: 'absolute',
        top: '5em',
        'overflow-y': 'scroll'
      }).css({
        width: '100%',
        height: app.styles.mainDisplay.height
      }).css({
        // for looks, e.g. color, background-color...
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
      controllerAs: 'NetworkDiagramController',
      restrict: 'E',
      scope: {}, // use isolate scope and non interface
      templateUrl: app.viewsDir.networkDiagram + 'root/root.html'
    }
  }
}

angular.module(app.appName).directive('isemNetworkDiagram', Definition.ddo);
