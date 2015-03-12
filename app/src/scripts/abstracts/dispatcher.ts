'use strict';
import injector = require('../injector');
var angular = injector.angular();

class AbstractDispatcher {
  /* protected */
  protected $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
    // noop
  }

  /**
   * @returns {void}
   */
  protected init() {
    var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
    this.$rootScope = rootElement.scope();
  }

  /**
   * @param {string}   name
   * @param {Function} listener
   * @returns {void}
   */
  on(name: string, listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    if (!this.$rootScope) {this.init()}
    this.$rootScope.$on(name, listener);
  }
}

export = AbstractDispatcher;
