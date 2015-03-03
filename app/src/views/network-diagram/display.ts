'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();
var d3      = Injector.d3();
var egrid   = Injector.egrid();

import IsemInjector = require('../../scripts/isem-injector');
var app = IsemInjector.app();

interface Scope extends ng.IScope {
  graph: egrid.core.Graph;
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
}

function ddo() {
  return {
    restrict: 'E',
    controller: Controller,
    controllerAs: 'Controller',
    templateUrl: app.viewsDir.networkDiagram + 'display.html',
    scope: {}
  }
}

angular.module(app.appName).directive('isemNetworkDiagramDisplay', ddo);
