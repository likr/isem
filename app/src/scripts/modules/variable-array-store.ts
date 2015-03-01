'use strict';
import typeVertex = require('../modules/vertex');

import Injector = require('../injector');
var angular = Injector.angular();
var egrid   = Injector.egrid();

import IsemInjector = require('../isem-injector');
var app        = IsemInjector.app();
var Converter  = IsemInjector.CsvToAlphaConverter();
var Dispatcher = IsemInjector.VariableArrayDispatcher();
var Vertex     = IsemInjector.Vertex();

export interface API {
  graph: egrid.core.Graph;
  variableArray: string[];

  init(): void;
  addChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
  removeChangeListener(listener: (event: ng.IAngularEvent, ...args: any[]) => any): void;
}

class VariableArrayStore {
  static CHANGE_EVENT = 'VariableArrayStore:change';

  public graph: egrid.core.Graph;
  public variableArray: Array<typeVertex.Instance>;

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
    this.graph = egrid.core.graph.adjacencyList();

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
      Vertex.addLatentVariable(this.graph, label);
      this.replaceVariableArray();
      this.publishChange();
    };
  }

  /**
   * @returns {Function}
   */
  private onImportFileCallback(): (event: ng.IAngularEvent, ...args: any[]) => any {
    return (_, importedFile) => {
      try {
        var converter = new Converter();
        var result = converter.convert(importedFile);
      } catch (e) {
        return this.publishChange(e);
      }

      if (!result) {
        var err = new Error('There is no converted result from the imported file');
        return this.publishChange(err);
      }

      this.replaceAllVertex(result);
      this.publishChange();
    };
  }

  /**
   * @returns {void}
   */
  private replaceVariableArray() {
    this.variableArray = <any>this.graph.vertices().map((u) => {
      var vertex = this.graph.get(u);
      vertex.vertexId = u;
      return vertex;
    });
  }

  /**
   * @returns {void}
   */
  private replaceAllVertex(result: {nodes: string[]; S: number[][]}) {
    this.removeAllVertex();
    result.nodes.forEach((label: string, i: number) => {
      return Vertex.addObservedVariable(this.graph, label, result.S[i]);
    });
    this.replaceVariableArray();
  }

  /**
   * Remove all vertex.
   * clearVertex() means remove edge from the in and out itself.
   * then remove each.
   *
   * @returns {void}
   */
  private removeAllVertex() {
    this.graph.vertices().forEach((u: number) => {
      this.graph.clearVertex(u);
      this.graph.removeVertex(u);
    });
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
   * @param {*} err
   * @returns {void}
   */
  private publishChange(err?: any) {
    this.$rootScope.$broadcast(VariableArrayStore.CHANGE_EVENT, err);
  }
}

export var singleton = new VariableArrayStore();
