'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app    = IsemInjector.app();
var styles = IsemInjector.styles();

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
