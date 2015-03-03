'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app = IsemInjector.app();

class Definition {
  static ddo() {
    return {
      restrict: 'A',
      templateUrl: app.viewsDir.networkDiagram + 'sub-column.html',
      scope: {
        variableArray: '&isemIoVariableArray'
      }
    };
  }
}

angular.module(app.appName).directive('isemNetworkDiagramSubColumn', Definition.ddo);
