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
    this.variableArray = this.variableArray || [];
    this.variableArray.push(v);
    this.publishOnChange();
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
    this.publishOnChange();
  }

  /**
   * @returns {void}
   */
  private publishOnChange() {
    this.$rootScope.$broadcast('VariableArrayStore:onChange', null); // notification only
  }
}

export = VariableArrayStore;
angular.module(app.appName).service('VariableArrayStore', VariableArrayStore);
