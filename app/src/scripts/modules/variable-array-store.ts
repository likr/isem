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
      this.addVariable(arg);
    });

    Dispatcher.registerOnImportFile((e, arg) => {
      var converter = new Converter();
      converter.convert(arg).then((result) => {
        this.replaceVariableArray(result.nodes);
      });
    });
  }

  /**
   * @params {*} v - variable
   * @returns {void}
   */
  private addVariable(v: any) {
    this.variableArray = this.variableArray || [];
    this.variableArray.push(v);
    this.publishChange();
  }

  /**
   * @returns {void}
   */
  private addPath() {
    //
  }

  /**
   * @returns {void}
   */
  private removeVariable() {
    //
  }

  /**
   * @returns {void}
   */
  private removePath() {
    //
  }

  /**
   * @params {string[]} vars - variables
   * @returns {void}
   */
  private replaceVariableArray(vars: string[]) {
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

export var singleton = new VariableArrayStore();
