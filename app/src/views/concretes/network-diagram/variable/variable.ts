'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');
import vtg = require('../sub-tool-group/sub-tool-group');

interface VariableScope extends ng.IScope {
  variableArray: string[];
}

class VariableController {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: VariableScope
  ) {
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
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

function styling(tElement: ng.IAugmentedJQuery) {
  var mainHeight = app.styles.mainDisplay.heightRawExp;
  tElement
    .children('div')
    .css({
      'overflow-y': 'scroll'
    }).css({
      // do not specify 'width: 100%' because of the display position of scroll bar shifted.
      height: 'calc' + '(' + mainHeight + ' - ' + vtg.height + ')'
    });
}

function compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
  styling(tElement);
  return () => {}; // link is do nothing
}

function ddo() {
  return {
    compile: compile,
    controller: VariableController,
    controllerAs: 'Variable',
    restrict: 'E',
    templateUrl: app.viewsDir.networkDiagram + 'variable/variable.html',
    scope: {
      variableArray: '=isemIoVariableArray'
    }
  }
}

angular.module(app.appName).directive('isemVariable', ddo);
