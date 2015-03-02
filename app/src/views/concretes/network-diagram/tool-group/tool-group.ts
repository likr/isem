'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');

import AddLatentVariable = require('../../dialogs/add-latent-variable/add-latent-variable')
import ImportFile        = require('../../dialogs/import-file/import-file')

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

function ddo() {
  return {
    controller: Controller,
    controllerAs: 'Controller',
    restrict: 'E',
    templateUrl: app.viewsDir.networkDiagram + 'tool-group/tool-group.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramToolGroup', ddo);
