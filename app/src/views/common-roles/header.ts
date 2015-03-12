'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var localized = IsemInjector.localized();

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
    this.initLocalizedLabel(this.$scope.locale());
  }

  private initLocalizedLabel(locale: string) {
    this.$scope.localized = localized(locale, directiveName);
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
