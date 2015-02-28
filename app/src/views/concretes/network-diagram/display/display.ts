'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');

interface Scope extends ng.IScope {
  variableArray: string[];
}

class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    //
  }

  /**
   * getter of $scope._variableArray
   * @returns {string[]}
   */
  variableArray() {
    return this.$scope.variableArray;
  }
}

function ddo() {
  return {
    restrict: 'E',
    controller: Controller,
    controllerAs: 'Controller',
    templateUrl: app.viewsDir.networkDiagram + 'display/display.html',
    scope: {
      variableArray: '=isemIoVariableArray'
    }
  }
}

angular.module(app.appName).directive('isemNetworkDiagramDisplay', ddo);
