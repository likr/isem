'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');

function styling(tElement: ng.IAugmentedJQuery) {
  tElement
    .addClass('container-fluid')
    .css({
      'z-index': 200,
      position: 'fixed',
      bottom: 0
    }).css({
      width: '100%',
      height: app.styles.isemFooter.height
    }).css({
      'background-color': '#eee'
    });
}

function compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
  styling(tElement);
  return () => {}; // link is do nothing
}

function ddo(): ng.IDirective {
  return {
    compile: compile,
    restrict: 'E',
    templateUrl: app.viewsDir.commonRoles + 'footer/footer.html'
  }
}

angular.module(app.appName).directive('isemFooter', ddo);
