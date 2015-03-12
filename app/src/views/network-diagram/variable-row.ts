'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var constants = injector.constants();

var directiveName = 'isemVariableRow';

/* className constants */
var VERTEX_ENABLED  = 'isem-vertex-enabled';
var VERTEX_DISABLED = 'isem-vertex-disabled';

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
    private $scope: Scope,
    private $element: ng.IAugmentedJQuery
  ) {
    // noop
  }

  /**
   * @returns {typeVertex.Props}
   */
  variable(): typeVertex.Props {
    Controller.updateClassForIcon(this.$scope.variable(), this.$element);
    return this.$scope.variable();
  }

  /**
   * @returns {void}
   */
  toggleDisplay() {
    var id = this.$scope.variable().vertexId;
    this.$rootScope.$broadcast(constants.TOGGLE_VERTEX_DISPLAY, id);
  }

  /**
   * @returns {void}
   */
  static updateClassForIcon(variable: typeVertex.Props, element: ng.IAugmentedJQuery) {
    if (variable.enabled) {
      element.removeClass(VERTEX_DISABLED).addClass(VERTEX_ENABLED);
      return;
    }
    element.removeClass(VERTEX_ENABLED).addClass(VERTEX_DISABLED);
  }
}

class Definition {
  static styling(element: ng.IAugmentedJQuery) {
    element.addClass(VERTEX_ENABLED);
  }

  static compile(tElement: ng.IAugmentedJQuery) {
    Definition.styling(tElement);
    return Definition.link;
  }

  static link($scope: Scope, iElement: ng.IAugmentedJQuery) {
    Controller.updateClassForIcon($scope.variable(), iElement);
  }

  static ddo() {
    return {
      compile: Definition.compile,
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      scope: {
        variable: '&isemIoVariable'
      },
      templateUrl: app.viewsDir.networkDiagram + 'variable-row.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
