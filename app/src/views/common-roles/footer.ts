'use strict';
import injector = require('../../scripts/injector');
var angular = injector.angular();
var app     = injector.app();

var directiveName = 'isemFooter';

class Definition {
  static ddo(): ng.IDirective {
    return {
      restrict: 'E',
      templateUrl: app.viewsDir.commonRoles + 'footer.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
