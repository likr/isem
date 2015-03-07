'use strict';
import Injector = require('../injector');
var angular = Injector.angular();

class CsvToAlphaConverter {
  /**
   * @constructor
   */
  constructor() {
    // Do nothing
  }

  /**
   * @params {Array} data
   * @returns {Object}
   */
  convert(data: Array<{[label: string]: string}>): {nodes: string[]; S: number[][];} {
    var singleData = data[0];
    var nodes = this.makeNodes(singleData);
    var S     = this.makeS(data, nodes);
    return {nodes: nodes, S: S};
  }

  /**
   * @param {Object} data
   * @returns {string[]}
   */
  private makeNodes(data: {[label: string]: string}): string[] {
    var labels: string[] = [];
    var v: string;
    for (v in data) {
      if (data.hasOwnProperty(v)) {labels.push(v);}
    }
    return labels;
  }

  /**
   * @param {*} data
   * @param {string[]} vars
   * @returns {number[][]}
   */
  private makeS(data: Array<{[label: string]: string}>, vars: string[]): number[][] {
    var x = vars.map((key: string): number[] => {
      return data.map((d: {[label: string]: string}): number => {
        return parseFloat(d[key]);
      });
    });
    return x;
  }
}

export = CsvToAlphaConverter;
