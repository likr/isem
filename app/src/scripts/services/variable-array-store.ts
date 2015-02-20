'use strict';
import angular = require('angular');
import app = require('../app');

class VariableArrayStore {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService
  ) {
    //
  }

  /**
   * @params {*} v - variable
   * @returns {void}
   */
  addVariable(v: any) {
    console.log('VariableArrayStore#addVariable', v);
  }

  /**
   * @returns {void}
   */
  addPath() {
    //
  }

  /**
   * @returns {void}
   */
  removeVariable() {
    //
  }

  /**
   * @returns {void}
   */
  removePath() {
    //
  }
}

export = VariableArrayStore;
angular.module(app.appName).service('VariableArrayStore', VariableArrayStore);
