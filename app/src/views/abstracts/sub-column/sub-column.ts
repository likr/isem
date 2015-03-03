'use strict';
import angular = require('angular');
import app = require('../../../scripts/app');
import styles = require('../../../scripts/styles');

function styling(tElement: ng.IAugmentedJQuery) {
  tElement
    .css({
      width: '300px',
      height: styles.mainDisplay.height
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
    template: ''
  }
}

angular.module(app.appName).directive('isemSubColumn', ddo);
