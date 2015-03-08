'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import Injector = require('../../scripts/injector');
var angular = Injector.angular();
var log     = Injector.log();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var styles    = IsemInjector.styles();

interface Scope extends ng.IScope {
  variableArray(): Array<typeVertex.Props>;
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
   * @returns {void}
   */
  toggleDisplayAll() {
    if (!this.$scope.variableArray()) {
      log.warn(log.t(), __filename, '#toggleDisplayAll(), variableArray() is undefined, aborting');
      return;
    }

    var enabledArray = this.$scope.variableArray().filter((v) => {
      return v.enabled;
    });

    var ids = this.$scope.variableArray().map((v) => { // All ids
      return v.vertexId;
    });

    if (0 < enabledArray.length) {
      this.$rootScope.$broadcast(constants.DISABLE_VERTEX_DISPLAY, ids);
      return;
    }

    this.$rootScope.$broadcast(constants.ENABLE_VERTEX_DISPLAY, ids);
  }
}

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        // positioning
        'z-index': 200,
        position:  'absolute',
        bottom:    0,
        // size
        width:  'inherit',
        height: styles.subToolGroup.height,
        // visually
        'background-color': styles.colors.toolGroupBackground,
        'border-top':       'solid 1px ' + styles.colors.subToolGroupBorder,
        'border-right':     'inherit'
      });

    tElement.find('.glyphicon')
      .css({
        // size
        margin: '15px 0 0 40px'
      });
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
    Definition.styling(tElement);
    return () => {}; // link is do nothing
  }

  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      compile: Definition.compile,
      restrict: 'E',
      scope: {
        variableArray: '&isemIoVariableArray'
      },
      templateUrl: app.viewsDir.networkDiagram + 'sub-tool-group.html'
    };
  }
}

angular.module(app.appName).directive('isemSubToolGroup', Definition.ddo);
