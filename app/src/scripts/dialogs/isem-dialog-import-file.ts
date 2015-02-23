'use strict';
import angular = require('angular');
import app = require('../app');

interface DialogImportFileScope extends ng.IScope {
  dialog: any;
}

class DialogImportFileController {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: DialogImportFileScope
  ) {
    //
  }

  /**
   * @param {*} v - variable
   */
  importFile(v: any) {
    console.log('DialogImportFileController#importFile()', v);
    this.$rootScope.$broadcast('isem:importFile', v);
    this.$scope.dialog.close();
  }
}

function link($scope: DialogImportFileScope, _: any, __: any, cwModal: any) {
  $scope.dialog = cwModal.dialog;
}

function ddo() {
  return {
    controller: DialogImportFileController,
    controllerAs: 'DialogImportFile',
    link: link,
    require: '^cwModal',
    restrict: 'E',
    scope: {}, // use isolate scope
    templateUrl: app.viewsDir.dialogs + 'isem-dialog-import-file.html'
  };
}

angular.module(app.appName).directive('isemDialogImportFile', ddo);
