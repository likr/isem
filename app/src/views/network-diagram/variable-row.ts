'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var styles    = IsemInjector.styles();

interface Scope extends ng.IScope {
  variable(): typeVertex.Props;
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
    // Do nothing
  }

  /**
   * @returns {void}
   */
  toggleDisplay() {
    var id = this.$scope.variable().vertexId;
    this.$rootScope.$broadcast(constants.TOGGLE_VERTEX_DISPLAY, id);
  }
}

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        //
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
      templateUrl: app.viewsDir.networkDiagram + 'variable-row.html',
      scope: {
        variable: '&isemIoVariable'
      }
    };
  }
}

angular.module(app.appName).directive('isemVariableRow', Definition.ddo);
