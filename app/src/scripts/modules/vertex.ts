'use strict';

export interface Constructor {
  newObservedVariable(adjacencyList: egrid.core.Graph, label: string, data: number[]): Instance;
  newLatentVariable(adjacencyList: egrid.core.Graph, label: string): Instance;
}

export interface Props {
  label:   string;
  latent:  boolean;
  enabled: boolean;
  data:    number[];
}

export interface Instance extends Props {
  //
}

class Vertex implements Props {
  public label:   string;
  public latent:  boolean;
  public enabled: boolean;
  public data:    number[];

  private vertexId: number;

  /**
   * @constructor
   * @param {egrid.core.Graph} adjacencyList
   * @param {string}           label
   * @param {boolean}          latent
   * @param {number[]}         [data]
   */
  constructor(adjacencyList: egrid.core.Graph, label: string, latent: boolean, data?: number[]) {
    this.label   = label;
    this.latent  = latent;
    this.enabled = true;
    this.data    = data || void 0;

    this.vertexId = adjacencyList.addVertex(Vertex.deepCopy(this));
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

  /**
   * @param {egrid.core.Graph}  adjacencyList
   * @param {string} label
   * @param {number[]} data
   * @returns {Vertex}
   */
  static newObservedVariable(adjacencyList: egrid.core.Graph, label: string, data: number[]) {
    return new Vertex(adjacencyList, label, false, data);
  }

  /**
   * @param {egrid.core.Graph}  adjacencyList
   * @param {string} label
   * @returns {Vertex}
   */
  static newLatentVariable(adjacencyList: egrid.core.Graph, label: string) {
    return new Vertex(adjacencyList, label, true);
  }
}

module.exports.newObservedVariable = Vertex.newObservedVariable;
module.exports.newLatentVariable   = Vertex.newLatentVariable;
