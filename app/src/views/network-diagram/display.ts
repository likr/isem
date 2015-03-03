'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app = IsemInjector.app();

class Definition {
  static ddo() {
    return {
      restrict: 'E',
      templateUrl: app.viewsDir.networkDiagram + 'display.html',
      scope: {}
    };
  }
}

angular.module(app.appName).directive('isemNetworkDiagramDisplay', Definition.ddo);
