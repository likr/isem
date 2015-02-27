'use strict';
import Injector = require('../injector');
var angular = Injector.angular();

import IsemInjector = require('../isem-injector');
var app = IsemInjector.app();
var Converter = IsemInjector.CsvToAlphaConverter();
var Dispatcher = IsemInjector.VariableArrayDispatcher();

var CHANGE_EVENT = 'VariableArrayStore:change';

export interface API {
  variableArray: string[];

  init(): void;
  addChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
  removeChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
}

class VariableArrayStore {
  public variableArray: string[];
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
    Dispatcher.registerOnAddVariable((_, arg) => {
      this.variableArray = this.variableArray || [];
      this.variableArray.push(arg);
      this.publishChange();
    });

    Dispatcher.registerOnImportFile((_, arg) => {
      var converter = new Converter();
      converter.convert(arg).then((result) => {
        this.variableArray = result.nodes;
        this.publishChange();
      });
    });
  }

  /**
   * For capsulize event name to other components
   *
   * @param {Function} listener
   * @returns {void}
   */
  addChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    this.$rootScope.$on(CHANGE_EVENT, listener);
  }

  /**
   * @see Stack Overflow {@link http://goo.gl/IRTpGA}
   * @param {Function} listener
   * @returns {void}
   */
  removeChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any) {
    var namedListeners = (<any>this.$rootScope).$$listeners[CHANGE_EVENT];
    if (namedListeners) {
      // Loop through the array of named listeners and remove them from the array.
      for (var i = 0; i < namedListeners.length; i++) {
        if (namedListeners[i] === listener) {
          return namedListeners.splice(i, 1);
        }
      }
    }
  }

  /**
   * @returns {void}
   */
  private publishChange() {
    this.$rootScope.$broadcast(CHANGE_EVENT, null); // notification only
  }
}

export var singleton = new VariableArrayStore();
