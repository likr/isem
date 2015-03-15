'use strict';
import injector = require('../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

var directiveName = 'isemScreenNetworkDiagram';

export class Definition {
  static ddo() {
    return {
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.screens + 'screen-network-diagram.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
