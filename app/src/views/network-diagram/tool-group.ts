'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var AddLatentVariable = IsemInjector.AddLatentVariable();
var app               = IsemInjector.app();
var ImportFile        = IsemInjector.ImportFile();
var localized         = IsemInjector.localized();
var styles            = IsemInjector.styles();

var directiveName = 'isemNetworkDiagramToolGroup';

interface Scope extends ng.IScope {
  localized: any;
  locale(): string;
}

class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    this.initLocalizedLabel(this.$scope.locale());
  }

  /**
   * @param {string} locale
   * @returns {void}
   */
  private initLocalizedLabel(locale: string) {
    this.$scope.localized = localized(locale, directiveName);
  }

  /**
   * @returns {void}
   */
  openAddVariable() {
    AddLatentVariable.open();
  }

  /**
   * @returns {void}
   */
  openImportFile() {
    ImportFile.open();
  }
}

class Definition {
  static styling(tElement: ng.IAugmentedJQuery) {
    tElement
      .css({
        // positioning
        position: 'absolute',
        // size
        'box-sizing': 'border-box',
        width:        '100%',
        height:       styles.mainToolGroup.height,
        // visually
        'background':    styles.colors.mainToolGroupBackground,
        'border-bottom': 'solid 1px ' + styles.colors.footerBorder
      });

    var marginTopRaw = 12;
    tElement.children('div')
      .css({
        'margin-top':  marginTopRaw + 'px',
        'margin-left': (marginTopRaw * 1.333) + 'px'
      });

    tElement.find('button')
      .css({
        'margin-right': (marginTopRaw * 0.666) + 'px'
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
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.networkDiagram + 'tool-group.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
