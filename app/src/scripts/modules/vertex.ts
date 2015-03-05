'use strict';

export interface Constructor {
  addObservedVariable(adjacencyList: egrid.core.Graph, label: string, data: number[]): Instance;
  addLatentVariable  (adjacencyList: egrid.core.Graph, label: string): Instance;
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

  /**
   * @param {egrid.core.Graph}  adjacencyList
   * @param {string} label
   * @param {number[]} data
   * @returns {Vertex}
   */
  static addObservedVariable(adjacencyList: egrid.core.Graph, label: string, data: number[]) {
    return new Vertex(adjacencyList, label, false, data);
  }

  /**
   * @param {egrid.core.Graph}  adjacencyList
   * @param {string} label
   * @returns {Vertex}
   */
  static addLatentVariable(adjacencyList: egrid.core.Graph, label: string) {
    return new Vertex(adjacencyList, label, true);
  }
}


module.exports = {
  addObservedVariable: Vertex.addObservedVariable,
  addLatentVariable:   Vertex.addLatentVariable
};