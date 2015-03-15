'use strict';
import injector = require('../../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

var directiveName = 'isemNetworkDiagramDisplay';

class Definition {
  static ddo() {
    return {
      restrict: 'E',
      templateUrl: app.viewsDir.networkDiagram + 'display.html',
      scope: {}
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
