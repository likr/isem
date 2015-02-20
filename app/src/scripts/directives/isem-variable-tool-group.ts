'use strict';
import angular = require('angular');
import app = require('../app');

export var height = '4em';

function styling(tElement: ng.IAugmentedJQuery) {
  tElement
    .css({
      'z-index': 200,
      position: 'absolute',
      bottom: 0
    }).css({
      width: '100%',
      height: height
    }).css({
      'background-color': '#eee'
    })
    .css(app.styles.clearBootstrapMargin)
}

function compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
  styling(tElement);
  return () => {}; // link is do nothing
}

function ddo() {
  return {
    compile: compile,
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-variable-tool-group.html'
  }
}

angular.module(app.appName).directive('isemVariableToolGroup', ddo);
