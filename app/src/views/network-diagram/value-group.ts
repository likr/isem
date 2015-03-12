'use strict';
import injector = require('../../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

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
