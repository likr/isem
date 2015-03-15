'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var constants = injector.constants();
var localized = injector.localized();
var log       = injector.log();

var AddLatentVariable = injector.AddLatentVariable();
var ImportFile        = injector.ImportFile();

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
    this.$scope.localized = localized(this.$scope.locale(), directiveName);
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
