'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app    = IsemInjector.app();
var styles = IsemInjector.styles();

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    var mainHeight = styles.mainDisplay.heightRawExp;
    var height = ['calc(', mainHeight, '-', styles.mainToolGroup.height, '-', styles.mainValueGroup.height, ')'].join(' ');
    tElement
      .css({
        'box-sizing': 'border-box',
        position: 'absolute',
        top: styles.mainToolGroup.height
      }).css({
        height: height,
        width: 'initial'
      }).css({
        'background': 'inherit'
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
      templateUrl: app.viewsDir.networkDiagram + 'display.html',
      scope: {}
    };
  }
}

angular.module(app.appName).directive('isemNetworkDiagramDisplay', Definition.ddo);
