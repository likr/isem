'use strict';
import angular = require('angular');
import app = require('../../../../scripts/app');
import vas = require('../../../../scripts/services/variable-array-store');
import ctac = require('../../../../scripts/services/csv-to-alpha-converter');

interface NetworkDiagramScope extends ng.IScope {
  _variableArray: string[];
}

class NetworkDiagramController {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: NetworkDiagramScope,
    private VariableArrayStore: vas,
    private CsvToAlphaConverter: ctac
  ) {
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    this.$rootScope.$on('isem:addVariable', (e, arg) => {
      this.VariableArrayStore.addVariable(arg);
    });

    this.$rootScope.$on('isem:importFile', (e, arg) => {
      var converting = this.CsvToAlphaConverter.convert(arg);
      converting.then((result) => {
        console.log('result', result);
        this.VariableArrayStore.replaceVariableArray(result.nodes);
      });
    });

    this.$rootScope.$on('VariableArrayStore:change', (_, __) => {
      this.$scope._variableArray = this.VariableArrayStore.variableArray;
    });
  }
}

function styling(tElement: ng.IAugmentedJQuery) {
  tElement
    .addClass('container-fluid')
    .css({
      position: 'absolute',
      top: '5em',
      'overflow-y': 'scroll'
    }).css({
      width: '100%',
      height: app.styles.mainDisplay.height
    }).css({
      // for looks, e.g. color, background-color...
    });
}

function compile(tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, _: any) {
  styling(tElement);
  return () => {}; // link is do nothing
}

function ddo() {
  return {
    compile: compile,
    controller: NetworkDiagramController,
    controllerAs: 'NetworkDiagram',
    restrict: 'E',
    scope: {}, // use isolate scope
    templateUrl: app.viewsDir.networkDiagram + 'root/root.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagram', ddo);
export = NetworkDiagramController;