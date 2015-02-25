'use strict';
import angular = require('angular');
import app = require('../../scripts/app');

function ddo() {
  return {
    restrict: 'E',
    templateUrl: 'src/screens/screen-network-diagram/screen-network-diagram.html'
  }
}

angular.module(app.appName).directive('isemScreenNetworkDiagram', ddo);
