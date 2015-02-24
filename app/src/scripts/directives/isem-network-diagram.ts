'use strict';
import angular = require('angular');
import app = require('../app');
import vas = require('../services/variable-array-store');
import ctac = require('../services/csv-to-alpha-converter');

class NetworkDiagramController {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
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
    templateUrl: app.viewsDir.directives + 'isem-network-diagram.html'
  }
}

angular.module(app.appName).directive('isemNetworkDiagram', ddo);
export = NetworkDiagramController;