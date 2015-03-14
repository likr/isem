'use strict';
import injector = require('../../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

var directiveName = 'isemNetworkDiagramSubColumn';

class Definition {
  static ddo() {
    return {
      restrict: 'A',
      scope: {
        variableArray: '&isemIoVariableArray'
      },
      templateUrl: app.viewsDir.networkDiagram + 'sub-column.html',
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
