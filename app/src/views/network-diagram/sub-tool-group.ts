'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import Injector = require('../../scripts/injector');
var angular = Injector.angular();
var log     = Injector.log();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var constants = IsemInjector.constants();
var styles    = IsemInjector.styles();

var directiveName = 'isemSubToolGroup';

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
  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      scope: {
        variableArray: '&isemIoVariableArray'
      },
      templateUrl: app.viewsDir.networkDiagram + 'sub-tool-group.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
