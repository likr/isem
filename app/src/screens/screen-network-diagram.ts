'use strict';
import injector = require('../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

class Definition {
  static ddo() {
    return {
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.screens + 'screen-network-diagram.html',
    };
  }
}

angular.module(app.appName).directive('isemScreenNetworkDiagram', Definition.ddo);
