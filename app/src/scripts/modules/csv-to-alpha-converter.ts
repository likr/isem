'use strict';
import Injector = require('../injector');
var angular = Injector.angular();
var semjs = Injector.semjs();

class CsvToAlphaConverter {
  /**
   * @constructor
   */
  constructor() {
    // Do nothing
  }

  /**
   * @params {*} data
   * @returns {*}
   */
  convert(data: any[]): {nodes: string[]; S: number[][];} {
    var nodes = this.makeNodes(data[0]);
    var S = this.makeS(data, nodes);
    return {nodes: nodes, S: S};
  }

  /**
   * @param {*} data
   * @returns {string[]}
   */
  private makeNodes(data: any): string[] {
    var vars: string[] = [];
    var v: string;
    for (v in data) {
      if (data.hasOwnProperty(v)) {vars.push(v);}
    }
    return vars;
  }

  /**
   * @param {*} data
   * @param {string[]} vars
   * @returns {string[]}
   */
  private makeS(data: any, vars: string[]): number[][] {
    var x = vars.map((key: string): number[] => {
      return data.map((d: {[key: string]: number}): number => d[key]);
    });
    return semjs.stats.cov(x);
  }
}

export = CsvToAlphaConverter;