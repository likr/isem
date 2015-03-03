'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app    = IsemInjector.app();
var styles = IsemInjector.styles();

export var height = '4em';

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        'z-index': 200,
        position: 'absolute',
        bottom: 0
      }).css({
        width: '100%',
        height: height
      }).css({
        'background-color': '#eee'
      })
      .css(styles.clearBootstrapMargin)
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
