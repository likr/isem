'use strict';
import angular = require('angular');
import app = require('../app');

function FooterDDO() {
  return {
    restrict: 'E',
    templateUrl: app.viewsDir.directives + 'isem-footer.html'
  }
}

angular.module(app.appName).directive('isemFooter', FooterDDO);
