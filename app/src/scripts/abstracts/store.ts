'use strict';
import Injector = require('../injector');
var angular = Injector.angular();

class AbstractStore {
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
   * For capsulize event name to other components
   *
   * @param {Function} listener
   * @param {string}   name
   * @returns {void}
   */
  addListener(name: string, listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    if (!this.$rootScope) {this.init()}
    this.$rootScope.$on(name, listener);
  }

  /**
   * Utility for remove listener from AngularJS $on listeners
   *
   * @see Stack Overflow {@link http://goo.gl/IRTpGA}
   * @param {string}   name
   * @param {Function} listener
   * @returns {void}
   */
  removeListener(name: string, listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    if (!this.$rootScope) {this.init()}
    var listeners = (<any>this.$rootScope).$$listeners[name];
    if (!listeners) {return}
    // Loop through the array of named listeners and remove them from the array.
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener) {
        listeners.splice(i, 1);
        return;
      }
    }
  }

  /**
   * @param {string} name
   * @param {*}      err
   * @returns {void}
   */
  protected publish(name: string, err?: any) {
    this.$rootScope.$broadcast(name, err);
  }
}

export = AbstractStore;
