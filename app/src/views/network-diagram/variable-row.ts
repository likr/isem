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
    private $scope: Scope,
    private $element: ng.IAugmentedJQuery
  ) {
    //
  }

  /**
   *
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
    var disabled = 'isem-vertex-disabled';
    var enabled  = 'isem-vertex-enabled';

    if (variable.enabled) {
      element.removeClass(disabled).addClass(enabled);
      return;
    }
    element.removeClass(enabled).addClass(disabled);
  }
}

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .addClass('isem-vertex-enabled');
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
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
      templateUrl: app.viewsDir.networkDiagram + 'variable-row.html',
      scope: {
        variable: '&isemIoVariable'
      }
    };
  }
}

angular.module(app.appName).directive('isemVariableRow', Definition.ddo);
