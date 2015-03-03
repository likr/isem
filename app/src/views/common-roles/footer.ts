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
        'z-index': 200,
        position: 'fixed',
        bottom: 0,
        'box-sizing': 'border-box'
      }).css({
        width: '100%',
        height: styles.isemFooter.height
      }).css({
        'background-color': styles.colors.footerBackground,
        'border-top': 'solid 1px ' + styles.colors.footerBorder
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
