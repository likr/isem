'use strict';
import injector = require('../../scripts/injector');
var angular    = injector.angular();
var app        = injector.app();
var constants  = injector.constants();
var d3         = injector.d3();
var document   = injector.document();
var FileReader = injector.FileReader();
var localized  = injector.localized();
var log        = injector.log();

var directiveName = 'isemDialogImportFile';

interface Scope extends ng.IScope {
  dialog: any;
  encoding: string;

  localized: any;
  locale(): string;
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
    log.trace(log.t(), __filename, 'constructor');
    this.$scope.encoding  = 'utf-8';
    this.$scope.localized = localized(this.$scope.locale(), directiveName);
  }

  /**
   * @returns {void}
   */
  importFile() {
    log.trace(log.t(), __filename, '#importFile()');
    var reader = new FileReader();
    reader.onload = this.fileReaderOnLoad();

    var file = (<HTMLInputElement>document.getElementById('file-input')).files[0];
    reader.readAsText(file, this.$scope.encoding);

    this.$scope.dialog.close();
  }

  /**
   * This when used to load a file is extracted for testable.
   *
   * @returns {Function}
   */
  private fileReaderOnLoad() {
    return (e: EventAltered) => {
      var data = d3.csv.parse(e.target.result);
      this.$rootScope.$broadcast(constants.IMPORT_FILE, data);
    };
  }

  /**
   * @returns {void}
   */
  cancel() {
    log.trace(log.t(), __filename, '#cancel()');
    this.$scope.dialog.close();
  }
}

export function open() {
  log.trace(log.t(), __filename, 'open()');
  var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
  var Dialog = rootElement.injector().get('Dialog');

  var dialog = new Dialog({
    template: '<isem-dialog-import-file isem-io-locale="$root.locale" />',
    width: 600
  });
  dialog.open();
}

export class Definition {
  static link($scope: Scope, _: any, __: any, cwModal: any) {
    $scope.dialog = cwModal.dialog;
  }

  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      link: Definition.link,
      require: '^cwModal',
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.dialogs + 'import-file.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
