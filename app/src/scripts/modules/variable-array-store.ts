'use strict';
import Injector = require('../injector');
var angular = Injector.angular();

import IsemInjector = require('../isem-injector');
var app = IsemInjector.app();
var Converter = IsemInjector.CsvToAlphaConverter();
var Dispatcher = IsemInjector.VariableArrayDispatcher();

export interface API {
  variableArray: string[];

  init(): void;
  addChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
  removeChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
}

class VariableArrayStore {
  static CHANGE_EVENT = 'VariableArrayStore:change';

  public variableArray: Array<{label: string}>;
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

    this.register();
  }

  /**
   * Register callback on the dispatcher
   *
   * @returns {void}
   */
  private register() {
    Dispatcher.init();
    Dispatcher.registerOnAddVariable(this.onAddVariableCallback());
    Dispatcher.registerOnImportFile(this.onImportFileCallback());
  }

  /**
   * @returns {Function}
   */
  private onAddVariableCallback(): (event: ng.IAngularEvent, ...args: any[]) => any {
    return (_, label) => {
      this.variableArray = this.variableArray || [];
      var variable = {
        label:   label,
        latent:  true,
        enabled: true
      };
      this.variableArray.push(variable);
      this.publishChange();
    };
  }

  /**
   * @returns {Function}
   */
  private onImportFileCallback(): (event: ng.IAngularEvent, ...args: any[]) => any {
    return (_, importedFile) => {
      var converter = new Converter();
      var result = converter.convert(importedFile);
      var nodes = result.nodes;
      var vars = nodes.map((label: string, i: number) => {
        return {
          label: label,
          latent: false,
          enabled: true,
          data: result.S[i]
        };
      });
      this.variableArray = vars;
      this.publishChange();
    };
  }

  /**
   * For capsulize event name to other components
   *
   * @param {Function} listener
   * @returns {void}
   */
  addChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    this.$rootScope.$on(VariableArrayStore.CHANGE_EVENT, listener);
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  removeChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    var listeners = (<any>this.$rootScope).$$listeners[VariableArrayStore.CHANGE_EVENT];
    app.removeListener(listeners, listener);
  }

  /**
   * @returns {void}
   */
  private publishChange() {
    this.$rootScope.$broadcast(VariableArrayStore.CHANGE_EVENT, null); // notification only
  }
}

export var singleton = new VariableArrayStore();
