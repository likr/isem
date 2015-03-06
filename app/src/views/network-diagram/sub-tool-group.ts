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
        'z-index': 200,
        position:  'absolute',
        bottom:    0,
        // size
        width:  'inherit',
        height: styles.subToolGroup.height,
        // visually
        'background-color': styles.colors.toolGroupBackground,
        'border-top':       'solid 1px ' + styles.colors.subToolGroupBorder,
        'border-right':     'inherit'
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
      templateUrl: app.viewsDir.networkDiagram + 'sub-tool-group.html'
    };
  }
}

angular.module(app.appName).directive('isemSubToolGroup', Definition.ddo);
