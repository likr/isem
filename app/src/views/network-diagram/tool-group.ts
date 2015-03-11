'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import Injector = require('../../scripts/injector');
var angular = Injector.angular();
var log     = Injector.log();

import IsemInjector = require('../../scripts/isem-injector');
var AddLatentVariable = IsemInjector.AddLatentVariable();
var app               = IsemInjector.app();
var constants         = IsemInjector.constants();
var ImportFile        = IsemInjector.ImportFile();
var localized         = IsemInjector.localized();

var directiveName = 'isemNetworkDiagramToolGroup';

interface Scope extends ng.IScope {
  localized: any;
  locale(): string;
  variableArray(): Array<typeVertex.Props>;
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

  /**
   * @returns {void}
   */
  updateDiagram() {
    this.$rootScope.$broadcast(constants.REDRAW_DIAGRAM);
  }
}

class Definition {
  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      scope: {
        locale:        '&isemIoLocale',
        variableArray: '&isemIoVariableArray'
      },
      templateUrl: app.viewsDir.networkDiagram + 'tool-group.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
