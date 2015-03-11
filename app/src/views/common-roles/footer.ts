'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app = IsemInjector.app();

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
