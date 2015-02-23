'use strict';
import angular = require('angular');
import app = require('../app');

class NetworkDiagramToolGroupController {
  private dialogAddVariable: any;

  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private Dialog: any
  ) {
    this.dialogAddVariable = new Dialog({
      template: '<isem-dialog-add-latent-variable />'
    });
  }

  openDialogAddVariable() {
    console.log('openDialogAddVariable');
    this.dialogAddVariable.open();
  }
}

function ddo() {
  return {
    controller: NetworkDiagramToolGroupController,
    controllerAs: 'NetworkDiagramToolGroup',
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-network-diagram-tool-group.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramToolGroup', ddo);
