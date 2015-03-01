'use strict';
import Injector = require('../injector');
var angular = Injector.angular();

import IsemInjector = require('../isem-injector');
var constants = IsemInjector.constants();

export interface API {
  init(): void;
  registerOnAddVariable(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
  registerOnImportFile(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
}

class Dispatcher {
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
  init() {
    var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
    this.$rootScope = rootElement.scope();
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  registerOnAddVariable(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    this.$rootScope.$on(constants.ADD_LATENT_VARIABLE, listener);
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  registerOnImportFile(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    this.$rootScope.$on(constants.IMPORT_FILE, listener);
  }
}

export var singleton = new Dispatcher();
