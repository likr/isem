'use strict';
import Injector = require('../injector');
var angular = Injector.angular();

import IsemInjector = require('../isem-injector');
var app        = IsemInjector.app();
var Dispatcher = IsemInjector.NetworkDiagramDispatcher();

export interface API {
  init(): void;
  addChangeListener   (listener: (ev: ng.IAngularEvent, ...args: any[]) => any): void;
  removeChangeListener(listener: (ev: ng.IAngularEvent, ...args: any[]) => any): void;
}

class Renderer {
  /* local constant */
  static CHANGE_EVENT = 'NetworkDiagramRenderer:CHANGE_EVENT';

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
    Dispatcher.registerOnUpdateDiagram(this.onUpdateDiagramCallback());
  }

  /**
   * @returns {Function}
   */
  private onUpdateDiagramCallback(): (ev: ng.IAngularEvent, ...args: any[]) => any {
    return (_, arg) => {
      console.log('onUpdateDiagramCallback!!');
    };
  }

  /**
   * For capsulize event name to other components
   *
   * @param {Function} listener
   * @returns {void}
   */
  addChangeListener(listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    this.$rootScope.$on(Renderer.CHANGE_EVENT, listener);
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  removeChangeListener(listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    var listeners = (<any>this.$rootScope).$$listeners[Renderer.CHANGE_EVENT];
    app.removeListener(listeners, listener);
  }

  /**
   * @param {*} err
   * @returns {void}
   */
  private publishChange(err?: any) {
    this.$rootScope.$broadcast(Renderer.CHANGE_EVENT, err);
  }
}

export var singleton = new Renderer();
