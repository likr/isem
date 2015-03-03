'use strict';
import typeVertex = require('../modules/vertex');

import AbstractStore = require('../abstracts/store');
import Injector = require('../injector');
var angular = Injector.angular();
var egrid   = Injector.egrid();

import IsemInjector = require('../isem-injector');
var app        = IsemInjector.app();
var Converter  = IsemInjector.CsvToAlphaConverter();
var Dispatcher = IsemInjector.NetworkDiagramDispatcher();
var Vertex     = IsemInjector.Vertex();

declare var listenerType: (ev: ng.IAngularEvent, ...args: any[]) => any;
export interface API {
  graph: egrid.core.Graph;
  variableArray: string[];

  addListenerToChange     (listener: typeof listenerType): void;
  removeListenerFromChange(listener: typeof listenerType): void;
}

var prefix = 'VariableArrayStore:';
class Store extends AbstractStore {
  /* local constant */
  static CHANGE = prefix + 'CHANGE';

  /* public */
  graph: egrid.core.Graph;
  variableArray: Array<typeVertex.Instance>;

  /* protected */
  protected $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    super();
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
  }

  /**
   * @returns {void}
   */
  protected init() {
    super.init();
    this.graph = egrid.core.graph.adjacencyList();
    this.registerWithDispatcher();
  }

  /**
   * @returns {void}
   */
  private registerWithDispatcher() {
    Dispatcher.onAddRelation(this.onAddRelationCallback());
    Dispatcher.onAddVariable(this.onAddVariableCallback());
    Dispatcher.onImportFile(this.onImportFileCallback());
  }

  /**
   * @returns {Function}
   */
  private onAddRelationCallback(): typeof listenerType {
    return (_, data) => {
      console.log('onAddRelationCallback', data);
      this.graph.addEdge(data.idX, data.idY);
      this.publishChange();
    };
  }

  /**
   * @returns {Function}
   */
  private onAddVariableCallback(): typeof listenerType {
    return (_, label) => {
      Vertex.addLatentVariable(this.graph, label);
      this.replaceVariableArray();
      this.publishChange();
    };
  }

  /**
   * @returns {Function}
   */
  private onImportFileCallback(): typeof listenerType {
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

  /* for change */
  addListenerToChange(listener: typeof listenerType) {
    super.addListener(Store.CHANGE, listener);
  }

  removeListenerFromChange(listener: typeof listenerType) {
    super.removeListener(Store.CHANGE, listener);
  }

  protected publishChange(err?: any) {
    super.publish(Store.CHANGE, err);
  }
}

export var singleton = new Store();
