'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app    = IsemInjector.app();
var styles = IsemInjector.styles();

import subToolGroup = require('./sub-tool-group');

interface Scope extends ng.IScope {
  variableArray(): string[];
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
}

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    var mainHeight = styles.mainDisplay.heightRawExp;
    tElement
      .children('div')
      .css({
        'overflow-y': 'scroll'
      }).css({
        // do not specify 'width: 100%' because of the display position of scroll bar shifted.
        height: 'calc' + '(' + mainHeight + ' - ' + subToolGroup.height + ')'
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
      templateUrl: app.viewsDir.networkDiagram + 'variable.html',
      scope: {
        variableArray: '&isemIoVariableArray'
      }
    };
  }
}

angular.module(app.appName).directive('isemVariable', Definition.ddo);
