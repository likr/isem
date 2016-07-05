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
var storage        = injector.Storage();

var directiveName = 'isemDialogImportFile';

interface Scope extends ng.IScope {
  dialog: any;
  csvEncoding: string;
  graphEncoding: string;

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

  public errors : any;

  public projectName: any = "";

  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope,
    private $q: ng.IQService
  ) {
    this.resetErors();
    // DO NOT call #init() here because $scope hasn't been set yet.
  }

  init() {
    log.trace(log.t(), __filename, '#init()', this.$scope);

    this.$scope.csvEncoding  = 'utf-8';
    this.$scope.graphEncoding  = 'utf-8';
    this.$scope.localized = localized(this.$scope.locale(), directiveName);

    this.addKeyboardHandler();
  }

  private resetErors(){
    this.errors = {
      "noNameInput" : false,
      "noFileInput" : false,
    }
  }

  /**
   * @returns {void}
   */
  private addKeyboardHandler() {
    this.$scope.dialog.onKeyDown((e: KeyboardEvent) => {
      if (e.keyCode === 13/* enter */) {
        this.importFile();
      }
      if (e.keyCode === 27/* esc */) {
        this.cancel();
      }
    });
  }

  /**
   * @returns {void}
   */
  importFile() {
    log.trace(log.t(), __filename, '#importFile()');
    this.resetErors();

    var csvDeferred = this.$q.defer();
    var csvReader = new FileReader();
    csvReader.onload = (e: EventAltered) => {
      csvDeferred.resolve(d3.csv.parse(e.target.result));
    };
    var csvFile = (<HTMLInputElement>document.getElementById('csv-file-input')).files[0];

    if(!this.projectName){
      this.errors.noNameInput = true;
      return;
    }
    if(!csvFile){
      this.errors.noFileInput = true;
      return;
    }

    csvReader.readAsText(csvFile, this.$scope.csvEncoding);

    var graphDeferred = this.$q.defer();
    var graphReader = new FileReader();
    graphReader.onload = (e: EventAltered) => {
      graphDeferred.resolve(JSON.parse(e.target.result));
    };
    var graphFile = (<HTMLInputElement>document.getElementById('graph-file-input')).files[0];
    if (graphFile) {
      graphReader.readAsText(graphFile, this.$scope.graphEncoding);
    } else {
      graphDeferred.resolve(null);
    }

    this.$q.all([csvDeferred.promise, graphDeferred.promise])
      .then((result) => {
        this.$rootScope.$broadcast(constants.IMPORT_FILE, result[0], result[1]);
        storage.save(this.projectName,result[0],result[1])
        .then(function(item: any){
          location.href = `project/${item.data.id}`;
        })
      });

    this.$scope.dialog.close();
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
  static link($scope: Scope, _: any, __: any, controllers: any) {
    var cwModal = controllers[0];
    var self    = controllers[1];

    $scope.dialog = cwModal.dialog;
    self.init();
  }

  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      link: Definition.link,
      require: ['^cwModal', directiveName],
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.dialogs + 'import-file.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
