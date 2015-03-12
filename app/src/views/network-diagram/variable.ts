'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import injector = require('../../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

var directiveName = 'isemVariable';

interface Scope extends ng.IScope {
  variableArray(): Array<typeVertex.Props>;
}

class Definition {
  static ddo() {
    return {
      restrict: 'E',
      scope: {
        variableArray: '&isemIoVariableArray'
      },
      templateUrl: app.viewsDir.networkDiagram + 'variable.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
