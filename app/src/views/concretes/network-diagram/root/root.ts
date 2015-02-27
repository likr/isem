'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');

import vas = require('../../../../scripts/modules/variable-array-store');
var Store: vas.IVariableArrayStore = vas.singleton;

interface NetworkDiagramScope extends ng.IScope {
  _variableArray: string[];
}

class NetworkDiagramController {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $scope: NetworkDiagramScope
  ) {
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    Store.init();
    Store.addChangeListener((_, __) => {
      this.$scope._variableArray = Store.variableArray;
    });
  }
}

function styling(tElement: ng.IAugmentedJQuery) {
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

function compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
  styling(tElement);
  return () => {}; // link is do nothing
}

function ddo() {
  return {
    compile: compile,
    controller: NetworkDiagramController,
    controllerAs: 'NetworkDiagram',
    restrict: 'E',
    scope: {}, // use isolate scope and non interface
    templateUrl: app.viewsDir.networkDiagram + 'root/root.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagram', ddo);
export = NetworkDiagramController;