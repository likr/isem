'use strict';
import angular = require('angular');
import app = require('../app');

function styling(tElement: ng.IAugmentedJQuery) {
  tElement
    .addClass('container-fluid')
    .css({
      'z-index': 100,
      position: 'fixed',
      top: 0
    }).css({
      width: '100%',
      height: app.styles.isemHeader.height
    }).css({
      'background-color': '#333',
      color: '#eee'
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
    templateUrl: app.viewsDir.directives + 'isem-header.html'
  }
}

angular.module(app.appName).directive('isemHeader', ddo);
