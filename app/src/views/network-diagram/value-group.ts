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
        width:         '100%',
        height:        styles.mainValueGroup.height,
        'padding-top': '1em',
        // visually
        'background-color': styles.colors.valueGroupBackground,
        'border-top':       'solid 1px ' + styles.colors.valueGroupBorder
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
      scope: {
        attributeArray: '&isemIoAttributeArray',
        locale:         '&isemIoLocale'
      },
      templateUrl: app.viewsDir.networkDiagram + 'value-group.html'
    };
  }
}

angular.module(app.appName).directive('isemNetworkDiagramValueGroup', Definition.ddo);
