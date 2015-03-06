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
        // positioning
        float:    'left',
        position: 'absolute',
        // size
        height: styles.mainDisplay.height,
        width:  ['calc(', '100%', '-', styles.subColumn.width, ')'].join(' ')
      });
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
    Definition.styling(tElement);
    return () => {}; // link is do nothing
  }

  static ddo() {
    // Do NOT specify to the field of 'scope'
    // because of this directive is an abstract.
    return {
      compile: Definition.compile,
      restrict: 'E',
      template: ''
    };
  }
}

angular.module(app.appName).directive('isemMainColumn', Definition.ddo);
