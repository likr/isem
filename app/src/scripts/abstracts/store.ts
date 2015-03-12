'use strict';
import injector = require('../injector');
var angular = injector.angular();

class AbstractStore {
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
   * For capsulize event name to other components
   *
   * @param   {Function} listener
   * @param   {string}   name
   * @returns {{dispose: (function(): void)}}
   */
  baseAddListener(name: string, listener: (ev: ng.IAngularEvent, ...args: any[]) => any): {dispose(): void} {
    if (!this.$rootScope) {this.init()}
    var dispose: any = this.$rootScope.$on(name, listener);

    return {
      dispose: dispose
    };
  }

  /**
   * @param {string} name
   * @param {*}      err
   * @param {*}      args
   * @returns {void}
   */
  protected basePublish(name: string, err?: any, ...args: any[]) {
    var broadcastArgs = [name, err].concat(args);
    this.$rootScope.$broadcast.apply(this.$rootScope, broadcastArgs);
  }
}

export = AbstractStore;
