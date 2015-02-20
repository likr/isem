'use strict';
import angular = require('angular');
import app = require('../app');
import vas = require('../services/variable-array-store');

class NetworkDiagramController {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private VariableArrayStore: vas
  ) {
    this.subscribe();
  }

  /**
   * @returns {void}
   */
  private subscribe() {
    this.$rootScope.$on('isem:addVariable', (e, arg) => {
      this.VariableArrayStore.addVariable(arg);
    })
  }
}

function NetworkDiagramDDO() {
  return {
    restrict: 'E',
    templateUrl: 'src/views/isem-network-diagram.html',
    controller: NetworkDiagramController,
    controllerAs: 'NetworkDiagram'
  }
}

angular.module(app.appName).directive('isemNetworkDiagram', NetworkDiagramDDO);
