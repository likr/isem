'use strict';
import Injector = require('../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../scripts/isem-injector');
var app = IsemInjector.app();

class Definition {
  static ddo() {
    return {
      restrict: 'E',
      templateUrl: 'src/screens/screen-network-diagram.html'
    };
  }
}

angular.module(app.appName).directive('isemScreenNetworkDiagram', Definition.ddo);
