'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app = IsemInjector.app();

var directiveName = 'isemNetworkDiagramValueGroup';

class Definition {
  static ddo() {
    return {
      restrict: 'E',
      scope: {
        attributeArray: '&isemIoAttributeArray',
        locale:         '&isemIoLocale'
      },
      templateUrl: app.viewsDir.networkDiagram + 'value-group.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
