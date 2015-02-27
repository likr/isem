'use strict';
import Injector = require('../../../../scripts/injector');
var angular = Injector.angular();
var d3 = Injector.d3();
var document = Injector.document();
var FileReader = Injector.FileReader();

import IsemInjector = require('../../../../scripts/isem-injector');
var app = IsemInjector.app();

interface Scope extends ng.IScope {
  dialog: any;
}

interface EventAltered extends Event {
  target: TargetAltered;
}

interface TargetAltered extends EventTarget {
  result: string;
}

export class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    //
  }

  /**
   * @returns {void}
   */
  importFile() {
    var reader = new FileReader();
    reader.onload = this.fileReaderOnLoad.bind(this);

    var file = (<HTMLInputElement>document.getElementById('fileInput')).files[0];
    var encoding = (<HTMLInputElement>document.querySelectorAll('.encoding:checked')[0]).value;
    reader.readAsText(file, encoding);

    this.$scope.dialog.close();
  }

  /**
   * This when used to load a file is extracted for testable.
   *
   * @param {EventAltered} e - event
   * @returns {void}
   */
  private fileReaderOnLoad(e: EventAltered) {
    var data = d3.csv.parse(e.target.result);
    this.$rootScope.$broadcast('isem:importFile', data);
  }
}

export class Definition {
  static link($scope: Scope, _: any, __: any, cwModal: any) {
    $scope.dialog = cwModal.dialog;
  }

  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'ImportFileController',
      link: Definition.link,
      require: '^cwModal',
      restrict: 'E',
      scope: {}, // use isolate scope
      templateUrl: app.viewsDir.newDialogs + 'import-file/import-file.html'
    };
  }
}

angular.module(app.appName).directive('isemDialogImportFile', Definition.ddo);
