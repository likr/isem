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
    this.publishChange();
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
    this.publishChange();
  }

  /**
   * @returns {void}
   */
  private publishChange() {
    this.$rootScope.$broadcast('VariableArrayStore:change', null); // notification only
  }

  /**
   * For capsulize event name to other components
   *
   * @param {Function} listener
   * @returns {void}
   */
  addChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    this.$rootScope.$on('VariableArrayStore:change', listener);
  }
}

export = VariableArrayStore;
angular.module(app.appName).service('VariableArrayStore', VariableArrayStore);
