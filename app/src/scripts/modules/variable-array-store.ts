'use strict';
/* Use only typing */
import typeVertex  = require('../modules/vertex');
import AddRelation = require('../../views/dialogs/add-relation');
import Direction   = AddRelation.Direction

import AbstractStore = require('../abstracts/store');
import injector = require('../injector');
var angular = injector.angular();
var app     = injector.app();
var egrid   = injector.egrid();
var log     = injector.log();

var Converter  = injector.CsvToEgridConverter();
var Dispatcher = injector.NetworkDiagramDispatcher();
var Vertex     = injector.Vertex();

declare var listenerType: (ev: ng.IAngularEvent, ...args: any[]) => any;
export interface API {
  edgeArray:     [number, number][];
  graph:         egrid.core.Graph<typeVertex.Props, any>;
  variableArray: Array<typeVertex.Props>;

  addListener(listener: typeof listenerType): {dispose(): void};
}

class Store extends AbstractStore {
  /* local constant */
  static CHANGE = 'VariableArrayStore:CHANGE';

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

    Dispatcher.addHandlers({
      addRelation:          this.addRelation         .bind(this),
      addVariable:          this.addVariable         .bind(this),
      disableVertexDisplay: this.disableVertexDisplay.bind(this),
      enableVertexDisplay:  this.enableVertexDisplay .bind(this),
      importFile:           this.importFile          .bind(this),
      redrawDiagram:        this.redrawDiagram       .bind(this),
      removeRelation:       this.removeRelation      .bind(this),
      renameVariable:       this.renameVariable      .bind(this),
      toggleVertexDisplay:  this.toggleVertexDisplay .bind(this)
    });
  }

  /**
   * @param {*} _ - event non-use
   * @param {{direction: Direction, idX: number, idY: number}} data
   * @returns {void}
   */
  private addRelation(_: any, data: {direction: Direction; idX: number; idY: number}) {
    log.debug(log.t(), __filename, '#addRelation()', data);

    var x = data.idX;
    var y = data.idY;
    if (data.direction === Direction.xToY) {
      this.graph.addEdge(x, y);
    } else if (data.direction === Direction.mutual) {
      this.graph.addEdge(x, y);
      this.graph.addEdge(y, x);
    } else if (data.direction === Direction.yToX) {
      this.graph.addEdge(y, x);
    }

    this.updateStore();
    this.publish();
  }

  /**
   * @param {*} _ - event non-use
   * @param {string} label
   * @returns {void}
   */
  private addVariable(_: any, label: string) {
    log.trace(log.t(), __filename, '#addVariable()');

    Vertex.addLatentVariable(this.graph, label);

    this.updateStore();
    this.publish();
  }

  /**
   * @param {*} _ - event non-use
   * @param {Array<{string: string}>} importedFile
   * @returns {void}
   */
  private importFile(_: any, importedFile: Array<{[label: string]: string}>) {
    log.trace(log.t(), __filename, '#importFile()');

    try {
      var result = Converter.convert(importedFile);
    } catch (e) {
      return this.publish(e);
    }

    if (!result) {
      return this.publish(new Error('There is no converted result from the imported file'));
    }

    this.replaceAllVertex(result);
    this.publish();
  }

  /**
   * @returns {void}
   */
  private redrawDiagram() {
    log.trace(log.t(), __filename, '#redrawDiagram()');

    this.publish();
  }

  /**
   * @param {*} _ - event non-use
   * @param {Array<{u: number, v: number}>} removeTarget
   * @returns {void}
   */
  private removeRelation(_: any, removeTarget: Array<{u: number; v: number}>) {
    log.debug(log.t(), __filename, '#removeRelation()', removeTarget);

    removeTarget.forEach((target) => {
      this.graph.removeEdge(target.u, target.v);
    });

    this.updateStore();
    this.publish();
  }

  /**
   * @param {*} _ - event non-use
   * @param {{u: number, label: string}} data
   * @returns {void}
   */
  private renameVariable(_: any, data: {u: number; label: string}) {
    log.debug(log.t(), __filename, '#renameVariable()', data);

    Vertex.renameVariable(this.graph, data.u, data.label);

    this.updateStore();
    this.publish();
  }

  /**
   * @param {*} _ - event non-use
   * @param {number|number[]} vertexId - id or ids
   * @returns {void}
   */
  private disableVertexDisplay(_: any, vertexId: any) {
    log.trace(log.t(), __filename, '#disableVertexDisplay()', vertexId);

    this.setEnabledToMultipleVertices(vertexId, false);

    this.updateStore();
    this.publish();
  }

  /**
   * @param {*} _ - event non-use
   * @param {number|number[]} vertexId - id or ids
   * @returns {void}
   */
  private enableVertexDisplay(_: any, vertexId: any) {
    log.trace(log.t(), __filename, '#enableVertexDisplay()', vertexId);

    this.setEnabledToMultipleVertices(vertexId, true);

    this.updateStore();
    this.publish();
  }

  /**
   * @param {*} _ - event non-use
   * @param {number} vertexId
   * @returns {void}
   */
  private toggleVertexDisplay(_: any, u: number) {
    log.trace(log.t(), __filename, '#toggleVertexDisplay()', u);

    Vertex.toggleEnabled(this.graph, u);

    this.updateStore();
    this.publish();
  }

  /**
   * @param {number|number[]} vertexId - id or ids
   * @param {boolean}  state
   */
  private setEnabledToMultipleVertices(vertexId: any, state: boolean) {
    var ids: number[] = (Array.isArray(vertexId)) ? vertexId : [vertexId];
    ids.forEach(u => Vertex.setEnabled(this.graph, u, state));
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
  private replaceAllVertex(result: {labels: string[]; dataArray: number[][]}) {
    this.removeAllVertex();
    result.labels.forEach((label: string, i: number) => {
      return Vertex.addObservedVariable(this.graph, label, result.dataArray[i]);
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
