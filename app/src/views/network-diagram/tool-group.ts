'use strict';
import Injector = require('../../scripts/injector');
var angular = Injector.angular();

import IsemInjector = require('../../scripts/isem-injector');
var AddLatentVariable = IsemInjector.AddLatentVariable();
var app               = IsemInjector.app();
var ImportFile        = IsemInjector.ImportFile();
var styles            = IsemInjector.styles();

class Controller {
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
  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      templateUrl: app.viewsDir.networkDiagram + 'tool-group.html'
    };
  }
}

angular.module(app.appName).directive('isemNetworkDiagramToolGroup', Definition.ddo);
