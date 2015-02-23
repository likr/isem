'use strict';
import angular = require('angular');
import app = require('../app');

function styling(tElement: ng.IAugmentedJQuery) {
  tElement
    .css({
      width: '300px',
      height: app.styles.mainDisplay.height
    }).css({
      'background-color': '#f7f7ff'
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
    templateUrl: app.viewsDir.directives + 'isem-sub-column.html'
  }
}

angular.module(app.appName).directive('isemSubColumn', ddo);
