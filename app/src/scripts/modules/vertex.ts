'use strict';
export interface Props {
  label:    string;
  latent:   boolean;
  enabled:  boolean;
  data:     number[];
  vertexId: number;
}

export interface Instance extends Props {
  // no defined
}

class Vertex implements Props {
  label:    string;
  latent:   boolean;
  enabled:  boolean;
  data:     number[];
  vertexId: number;

  /**
   * @constructor
   * @param {egrid.core.Graph} adjacencyList
   * @param {string}           label
   * @param {boolean}          latent
   * @param {number[]}         [data]
   */
  constructor(adjacencyList: egrid.core.Graph<Props, any>, label: string, latent: boolean, data?: number[]) {
    this.label   = label;
    this.latent  = latent;
    this.enabled = true;
    this.data    = data || void 0;

    // deepCopy() removes unnecessary prototype props
    adjacencyList.addVertex(Vertex.deepCopy(this));
  }

  /**
   * @param {Object} o
   * @returns {*}
   */
  private static deepCopy(o: any): any {
    var copy: any = o;
    var k: any;
    if (o && typeof o === 'object') {
      copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
      for (k in o) {
        copy[k] = Vertex.deepCopy(o[k]);
      }
    }
    return copy;
  }
}

/**
 * @param   {egrid.core.Graph} adjacencyList
 * @param   {string}   label
 * @param   {number[]} data
 * @returns {Vertex}
 */
export function addObservedVariable(adjacencyList: egrid.core.Graph<Props, any>, label: string, data: number[]) {
  return new Vertex(adjacencyList, label, false, data);
}

/**
 * @param   {egrid.core.Graph} adjacencyList
 * @param   {string} label
 * @returns {Vertex}
 */
export function addLatentVariable(adjacencyList: egrid.core.Graph<Props, any>, label: string) {
  return new Vertex(adjacencyList, label, true);
}

/**
 * @param   {egrid.core.Graph} adjacencyList
 * @param   {number} u
 * @param   {string} newLabel
 * @returns {void}
 */
export function renameVariable(adjacencyList: egrid.core.Graph<Props, any>, u: number, newLabel: string) {
  var vertex = adjacencyList.get(u);
  vertex.label = newLabel;
  adjacencyList.set(u, vertex);
}

/**
 * @param   {egrid.core.Graph} adjacencyList
 * @param   {number}  u
 * @param   {boolean} state
 * @returns {void}
 */
export function setEnabled(adjacencyList: egrid.core.Graph<Props, any>, u: number, state: boolean) {
  var vertex = adjacencyList.get(u);
  vertex.enabled = state;
  adjacencyList.set(u, vertex);
}

/**
 * @param   {egrid.core.Graph} adjacencyList
 * @param   {number} u
 * @returns {void}
 */
export function toggleEnabled(adjacencyList: egrid.core.Graph<Props, any>, u: number) {
  var vertex = adjacencyList.get(u);
  setEnabled(adjacencyList, u, !vertex.enabled);
}