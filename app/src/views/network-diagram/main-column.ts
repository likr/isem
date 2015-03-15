'use strict';
import injector = require('../../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

var directiveName = 'isemNetworkDiagramMainColumn';

class Definition {
  static ddo() {
    return {
      restrict: 'A',
      scope: {
        attributeArray: '&isemIoAttributeArray',
        locale:         '&isemIoLocale',
        variableArray:  '&isemIoVariableArray'
      },
      templateUrl: app.viewsDir.networkDiagram + 'main-column.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
