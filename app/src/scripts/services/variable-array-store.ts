'use strict';
import angular = require('angular');
import app = require('../app');

class VariableArrayStore {
  public variableArray: string[];

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

  /**
   * @params {string[]} vars - variables
   * @returns {void}
   */
  replaceVariableArray(vars: string[]) {
    this.variableArray = vars;
    this.$rootScope.$broadcast('VariableArrayStore:onChange', null); // notification only
  }
}

export = VariableArrayStore;
angular.module(app.appName).service('VariableArrayStore', VariableArrayStore);
