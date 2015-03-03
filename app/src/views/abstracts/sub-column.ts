'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app    = IsemInjector.app();
var styles = IsemInjector.styles();

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        width: '300px',
        height: styles.mainDisplay.height
      }).css({
        'background-color': '#f7f7ff'
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
      template: ''
    };
  }
}

angular.module(app.appName).directive('isemSubColumn', Definition.ddo);
