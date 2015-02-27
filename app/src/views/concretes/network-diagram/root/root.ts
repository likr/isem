'use strict';
import Injector = require('../../../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../../../scripts/isem-injector');
var app = IsemInjector.app();
var Store = IsemInjector.VariableArrayStore();

interface Scope extends ng.IScope {
  _variableArray: string[];
}

export class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(private $scope: Scope) {
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    Store.init();
    Store.addChangeListener(this.changeCallback());
  }

  /**
   * This callback args are non-use
   *
   * @returns {Function}
   */
  private changeCallback(): (e: ng.IAngularEvent, args: any) => void {
    return (_, __) => {
      this.$scope._variableArray = Store.variableArray;
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
