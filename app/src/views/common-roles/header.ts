'use strict';
import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var localized = injector.localized();

var directiveName = 'isemHeader';

interface Scope extends ng.IScope {
  localized: any;
  locale(): string;
}

export class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $scope: Scope
  ) {
    this.$scope.localized = localized(this.$scope.locale(), directiveName);
  }
}

class Definition {
  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.commonRoles + 'header.html',
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
