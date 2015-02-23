'use strict';
import angular = require('angular');
import app = require('../app');
import variableToolGroup = require('./isem-variable-tool-group');

function styling(tElement: ng.IAugmentedJQuery) {
  tElement
    .children('div')
    .css({
      'overflow-y': 'scroll'
    }).css({
      // do not specify 'width: 100%' because of the display position of scroll bar shifted.
      height: 'calc' + '(' + app.styles.mainDisplay.heightRawExp + ' - ' + variableToolGroup.height + ')'
    });
}

function compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
  styling(tElement);
  return () => {}; // link is do nothing
}

function ddo() {
  return {
    compile: compile,
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-variable.html'
  }
}

angular.module(app.appName).directive('isemVariable', ddo);
