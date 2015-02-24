'use strict';
import angular = require('angular');
import app = require('../app');
import vtg = require('./isem-variable-tool-group');

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
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-variable.html'
  }
}

angular.module(app.appName).directive('isemVariable', ddo);
