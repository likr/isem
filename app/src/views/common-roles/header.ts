'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app    = IsemInjector.app();
var styles = IsemInjector.styles();

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .addClass('container-fluid')
      .css({
        'z-index': 100,
        position: 'fixed',
        top: 0
      }).css({
        width: '100%',
        height: styles.isemHeader.height
      }).css({
        'background-color': '#333',
        color: '#eee'
      });
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
    Definition.styling(tElement);
    return () => {}; // link is do nothing
  }

  static ddo() {
    return {
      compile: Definition.compile,
      restrict: 'E',
      templateUrl: app.viewsDir.commonRoles + 'header.html'
    };
  }
}

angular.module(app.appName).directive('isemHeader', Definition.ddo);
