'use strict';
import Injector = require('../injector');
var angular = Injector.angular();

import IsemInjector = require('../isem-injector');
var constants = IsemInjector.constants();

export interface API {
  onAddVariable  (listener: (ev: ng.IAngularEvent, ...args: any[]) => any): void;
  onImportFile   (listener: (ev: ng.IAngularEvent, ...args: any[]) => any): void;
  onUpdateDiagram(listener: (ev: ng.IAngularEvent, ...args: any[]) => any): void;
}

class Dispatcher {
  /* private */
  private $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
  }

  /**
   * @returns {void}
   */
  private init() {
    var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
    this.$rootScope = rootElement.scope();
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  onAddVariable(listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    if (!this.$rootScope) {this.init()}
    this.$rootScope.$on(constants.ADD_LATENT_VARIABLE, listener);
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  onImportFile(listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    if (!this.$rootScope) {this.init()}
    this.$rootScope.$on(constants.IMPORT_FILE, listener);
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  onUpdateDiagram(listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    if (!this.$rootScope) {this.init()}
    this.$rootScope.$on(constants.UPDATE_DIAGRAM, listener);
  }
}

export var singleton = new Dispatcher();
