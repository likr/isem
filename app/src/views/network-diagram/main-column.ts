'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app = IsemInjector.app();

class Definition {
  static ddo() {
    return {
      restrict: 'A',
      scope: {
        attributeArray: '&isemIoAttributeArray',
        locale:         '&isemIoLocale'
      },
      templateUrl: app.viewsDir.networkDiagram + 'main-column.html',
    };
  }
}

angular.module(app.appName).directive('isemNetworkDiagramMainColumn', Definition.ddo);
