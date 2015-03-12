'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app = IsemInjector.app();

class Definition {
  static ddo() {
    // Do NOT specify to the field of 'scope'
    // because of this directive is an abstract.
    return {
      restrict: 'E',
      template: ''
    };
  }
}

angular.module(app.appName).directive('isemSubColumn', Definition.ddo);
