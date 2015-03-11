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
  edgeArray:     [number, number][];
  graph:         egrid.core.Graph<typeVertex.Props, any>;
  variableArray: Array<typeVertex.Props>;

  addListener(listener: typeof listenerType): {dispose(): void};
}

var prefix = 'VariableArrayStore:';
class Store extends AbstractStore {
  /* local constant */
  static CHANGE = prefix + 'CHANGE';

  /* public */
  edgeArray:     [number, number][];
  graph:         egrid.core.Graph<typeVertex.Props, any>;
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
   * @param {function(ev: ng.IAngularEvent, ...args: *[]): *} listener
   * @returns {{dispose: (function(): void)}}
   */
  addListener(listener: typeof listenerType): {dispose(): any} {
    return super.baseAddListener(Store.CHANGE, listener);
  }

  /**
   * @param {*} err
   * @returns {void}
   */
  protected publish(err?: any) {
    super.basePublish(Store.CHANGE, err);
  }

  /**
   * @returns {void}
   */
  protected init() {
    super.init();
    log.trace(log.t(), __filename, '#init()');
    this.graph = egrid.core.graph.adjacencyList<typeVertex.Props, any>();
    this.registerWithDispatcher();
  }

  /**
   * @returns {void}
   */
  private registerWithDispatcher() {
    Dispatcher.onAddRelation   (this.onAddRelationCallback());
    Dispatcher.onAddVariable   (this.onAddVariableCallback());
    Dispatcher.onImportFile    (this.onImportFileCallback());
    Dispatcher.onRedrawDiagram (this.onRedrawDiagramCallback());
    Dispatcher.onRemoveRelation(this.onRemoveRelationCallback());

    Dispatcher.onDisableVertexDisplay(this.onDisableVertexDisplayCallback());
    Dispatcher.onEnableVertexDisplay (this.onEnableVertexDisplayCallback());
    Dispatcher.onToggleVertexDisplay (this.onToggleVertexDisplayCallback());
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

      this.updateStore();
      this.publish();
    };
  }

  /**
   * @returns {Function}
   */
  private onAddVariableCallback(): typeof listenerType {
    return (_, label) => {
      log.trace(log.t(), __filename, '#onAddVariableCallback()');

      Vertex.addLatentVariable(this.graph, label);

      this.updateStore();
      this.publish();
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
        return this.publish(e);
      }

      if (!result) {
        var err = new Error('There is no converted result from the imported file');
        return this.publish(err);
      }

      this.replaceAllVertex(result);
      this.publish();
    };
  }

  /**
   * @returns {Function}
   */
  private onRedrawDiagramCallback(): typeof listenerType {
    return (_, __) => {
      log.trace(log.t(), __filename, '#onRedrawDiagramCallback()');
      this.publish();
    };
  }

  /**
   * @returns {Function}
   */
  private onRemoveRelationCallback(): typeof listenerType {
    return (_: any, removeTarget: Array<{u: number; v: number}>) => {
      log.debug(log.t(), __filename, '#onRemoveRelationCallback()', removeTarget);

      removeTarget.forEach((target) => {
        this.graph.removeEdge(target.u, target.v);
      });

      this.updateStore();
      this.publish();
    };
  }

  /**
   * callback args "vertexId" is received type number|number[]
   *
   * @returns {Function}
   */
  private onDisableVertexDisplayCallback(): typeof listenerType {
    return (_: any, vertexId: any) => {
      log.trace(log.t(), __filename, '#onDisableVertexDisplayCallback()', vertexId);

      var ids: number[] = (Array.isArray(vertexId)) ? vertexId : [vertexId];
      this.setEnabledToMultipleVertices(ids, false);

      this.updateStore();
      this.publish();
    };
  }

  /**
   * callback args "vertexId" is received type number|number[]
   *
   * @returns {Function}
   */
  private onEnableVertexDisplayCallback(): typeof listenerType {
    return (_: any, vertexId: any) => {
      log.trace(log.t(), __filename, '#onEnableVertexDisplayCallback()', vertexId);

      var ids: number[] = (Array.isArray(vertexId)) ? vertexId : [vertexId];
      this.setEnabledToMultipleVertices(ids, true);

      this.updateStore();
      this.publish();
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

      this.updateStore();
      this.publish();
    };
  }

  /**
   * @param {number[]} ids
   * @param {boolean}  state
   */
  private setEnabledToMultipleVertices(ids: number[], state: boolean) {
    ids.forEach((id) => {
      var vertex = this.graph.get(id);
      vertex.enabled = state;
      this.graph.set(id, vertex);
    });
  }

  /**
   * @returns {void}
   */
  private updateStore() {
    this.updateVariableArray();
    this.updateEdgeArray();
  }

  /**
   * Update variable array by replace from graph.vertices().map()
   *
   * @returns {void}
   */
  private updateVariableArray() {
    this.variableArray = this.graph.vertices().map((u) => {
      var vertex = this.graph.get(u);
      vertex.vertexId = u;
      return vertex;
    });
  }

  /**
   * @returns {void}
   */
  private updateEdgeArray() {
    this.edgeArray = this.graph.edges();
  }

  /**
   * @returns {void}
   */
  private replaceAllVertex(result: {nodes: string[]; S: number[][]}) {
    this.removeAllVertex();
    result.nodes.forEach((label: string, i: number) => {
      return Vertex.addObservedVariable(this.graph, label, result.S[i]);
    });
    this.updateStore();
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
}

export var singleton = new Store();
