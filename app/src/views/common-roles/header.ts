'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var app       = IsemInjector.app();
var styles    = IsemInjector.styles();
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
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        'z-index': 100,
        position: 'fixed',
        top: 0
      }).css({
        width: '100%',
        height: styles.isemHeader.height
      }).css({
        'background': styles.colors.headerGradation,
        color: styles.colors.headerText
      });

    tElement.find('h1')
      .css({
        'margin-top': (styles.isemHeader.heightRaw * 0.2083) + 'px',
        'margin-left': styles.window.margin,
        'font-size':  (styles.isemHeader.heightRaw * 0.5) + 'px'
      });
  }

  static compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
    Definition.styling(tElement);
    return () => {}; // link is do nothing
  }

  static ddo() {
    return {
      compile: Definition.compile,
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      templateUrl: app.viewsDir.commonRoles + 'header.html',
      scope: {
        locale: '&isemIoLocale'
      }
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
