'use strict';
import Injector = require('../injector');
var angular = Injector.angular();

class AbstractDispatcher {
  /* protected */
  protected $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    // Do nothing
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
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
