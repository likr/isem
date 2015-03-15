'use strict';
import injector = require('../../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

var directiveName = 'isemMainColumn';

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

angular.module(app.appName).directive(directiveName, Definition.ddo);
