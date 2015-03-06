'use strict';
import typeVertex      = require('../modules/vertex');

import AddRelation = require('../../views/dialogs/add-relation');
import Direction   = AddRelation.Direction

import AbstractStore = require('../abstracts/store');
import Injector = require('../injector');
var angular = Injector.angular();
var egrid   = Injector.egrid();
var log     = Injector.log();

import IsemInjector = require('../isem-injector');
var app        = IsemInjector.app();
var Converter  = IsemInjector.CsvToAlphaConverter();
var Dispatcher = IsemInjector.NetworkDiagramDispatcher();
var Vertex     = IsemInjector.Vertex();

declare var listenerType: (ev: ng.IAngularEvent, ...args: any[]) => any;
export interface API {
  graph:         egrid.core.Graph<typeVertex.Props>;
  variableArray: Array<typeVertex.Props>;

  addListenerToChange     (listener: typeof listenerType): void;
  removeListenerFromChange(listener: typeof listenerType): void;
}

var prefix = 'VariableArrayStore:';
class Store extends AbstractStore {
  /* local constant */
  static CHANGE = prefix + 'CHANGE';

  /* public */
  graph:         egrid.core.Graph<typeVertex.Props>;
  variableArray: Array<typeVertex.Props>;

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
    log.trace(log.t(), __filename, '#init()');
    this.graph = egrid.core.graph.adjacencyList<typeVertex.Props>();
    this.registerWithDispatcher();
  }

  /**
   * @returns {void}
   */
  private registerWithDispatcher() {
    Dispatcher.onAddRelation(this.onAddRelationCallback());
    Dispatcher.onAddVariable(this.onAddVariableCallback());
    Dispatcher.onToggleVertexDisplay(this.onToggleVertexDisplayCallback());
    Dispatcher.onImportFile(this.onImportFileCallback());
  }

  /**
   * @returns {Function}
   */
  private onAddRelationCallback(): typeof listenerType {
    return (_, data) => {
      log.debug(log.t(), __filename, '#onAddRelationCallback()', data);
      if (data.direction === Direction.xToY) {
        this.graph.addEdge(data.idX, data.idY);
      } else if (data.direction === Direction.mutual) {
        this.graph.addEdge(data.idX, data.idY);
        this.graph.addEdge(data.idY, data.idX);
      } else if (data.direction === Direction.yToX) {
        this.graph.addEdge(data.idY, data.idX);
      }
      this.publishChange();
    };
  }

  /**
   * @returns {Function}
   */
  private onAddVariableCallback(): typeof listenerType {
    return (_, label) => {
      log.trace(log.t(), __filename, '#onAddVariableCallback()');
      Vertex.addLatentVariable(this.graph, label);
      this.replaceVariableArray();
      this.publishChange();
    };
  }

  /**
   * @returns {Function}
   */
  private onToggleVertexDisplayCallback(): typeof listenerType {
    return (_: any, vertexId: number) => {
      log.trace(log.t(), __filename, '#onToggleVertexDisplayCallback()', vertexId);

      var vertex = this.graph.get(vertexId);
      vertex.enabled = !vertex.enabled;
      this.graph.set(vertexId, vertex);

      this.replaceVariableArray();
      this.publishChange();
    };
  }

  /**
   * @returns {Function}
   */
  private onImportFileCallback(): typeof listenerType {
    return (_, importedFile) => {
      log.trace(log.t(), __filename, '#onImportFileCallback()');
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
    this.variableArray = this.graph.vertices().map((u) => {
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
    log.trace(log.t(), __filename, '#removeAllVertex()');
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
    log.trace(log.t(), __filename, '#publishChange()');
    super.publish(Store.CHANGE, err);
  }
}

export var singleton = new Store();
