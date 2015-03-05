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
        position:  'fixed',
        bottom:    0,
        // size
        'box-sizing': 'border-box',
        width:        '100%',
        height:       styles.isemFooter.height,
        // visually
        'background-color': styles.colors.footerBackground,
        'border-top':       'solid 1px ' + styles.colors.footerBorder
      });
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
    Definition.styling(tElement);
    return () => {}; // link is do nothing
  }

  static ddo(): ng.IDirective {
    return {
      compile: Definition.compile,
      restrict: 'E',
      templateUrl: app.viewsDir.commonRoles + 'footer.html'
    };
  }
}

angular.module(app.appName).directive('isemFooter', Definition.ddo);
