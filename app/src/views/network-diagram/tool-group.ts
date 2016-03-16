'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import injector = require('../../scripts/injector');
var angular   = injector.angular();
var app       = injector.app();
var constants = injector.constants();
var localized = injector.localized();
var log       = injector.log();
var storage   = injector.Storage();

var store   = injector.VariableArrayStore();

var AddLatentVariable = injector.AddLatentVariable();
var ImportFile        = injector.ImportFile();

var directiveName = 'isemNetworkDiagramToolGroup';

interface Scope extends ng.IScope {
  localized: any;
  locale(): string;
  variableArray(): Array<typeVertex.Props>;
  edgeArray(): any;
}

class Controller {

  public projectId: string;
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope,
    private $routeParams: ng.route.IRouteParamsService
  ) {
    this.$scope.localized = localized(this.$scope.locale(), directiveName);
    this.projectId = $routeParams["projectId"];
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
  /**
   * @returns {void}
   */
  saveDiagram() {
    storage.update(this.projectId,store);
    this.$rootScope.$broadcast(constants.REDRAW_DIAGRAM);
  }
  /**
   * @returns {void}
   */
  resetDiagram() {
    storage.reset(this.projectId,()=>{
      this.$rootScope.$broadcast(constants.REDRAW_DIAGRAM);
      location.reload();
    })
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
        variableArray: '&isemIoVariableArray',
        edgeArray: '&isemIoEdgeArray',
      },
      templateUrl: app.viewsDir.networkDiagram + 'tool-group.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
