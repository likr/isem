'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');
import cw = require('cw-modal');

class NetworkDiagramToolGroupController {
  private dialogAddVariable: cw.DialogInstance;
  private dialogImportFile: cw.DialogInstance;

  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private Dialog: cw.DialogStatic
  ) {
    this.registerDialog();
  }

  /**
   * @returns {void}
   */
  private registerDialog() {
    this.dialogAddVariable = new this.Dialog({
      template: '<isem-dialog-add-latent-variable />'
    });

    this.dialogImportFile = new this.Dialog({
      template: '<isem-dialog-import-file />'
    });
  }

  /**
   * @returns {void}
   */
  openDialogAddVariable() {
    this.dialogAddVariable.open();
  }

  /**
   * @returns {void}
   */
  openDialogImportFile() {
    this.dialogImportFile.open();
  }
}

function ddo() {
  return {
    controller: NetworkDiagramToolGroupController,
    controllerAs: 'NetworkDiagramToolGroup',
    restrict: 'E',
    templateUrl: app.viewsDir.networkDiagram + 'tool-group/tool-group.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagramToolGroup', ddo);
