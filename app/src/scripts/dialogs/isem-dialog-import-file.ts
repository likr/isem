'use strict';
import angular = require('angular');
import app = require('../app');
import d3 = require('d3');

interface DialogImportFileScope extends ng.IScope {
  dialog: any;
}

interface EventAltered extends Event {
  target: TargetAltered;
}

interface TargetAltered extends EventTarget {
  result: string;
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
   * @returns {void}
   */
  importFile() {
    console.log('DialogImportFileController#importFile()');

    var reader = new FileReader();
    reader.onload = (e: EventAltered) => {
      var data = d3.csv.parse(e.target.result);
      this.$rootScope.$broadcast('isem:importFile', data);
    };

    var file = (<HTMLInputElement>document.getElementById('fileInput')).files[0];
    var encoding = (<HTMLInputElement>document.querySelectorAll('.encoding:checked')[0]).value;
    reader.readAsText(file, encoding);

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
