'use strict';

export interface API {
  convert(data: Array<{[label: string]: string}>): {nodes: string[]; S: number[][]};
}

class CsvToAlphaConverter {
  /**
   * @params {Array} data
   * @returns {Object}
   */
  static convert(data: Array<{[label: string]: string}>): {nodes: string[]; S: number[][]} {
    var singleData = data[0];
    var nodes = CsvToAlphaConverter.makeNodes(singleData);
    var S     = CsvToAlphaConverter.makeS(data, nodes);
    return {nodes: nodes, S: S};
  }

  /**
   * @param {Object} data
   * @returns {string[]}
   */
  private static makeNodes(data: {[label: string]: string}): string[] {
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
  private static makeS(data: Array<{[label: string]: string}>, vars: string[]): number[][] {
    var typeD: {[label: string]: string};
    var x = vars.map((key: string) => {
      return data.map((d: typeof typeD) => {
        return parseFloat(d[key]);
      });
    });
    return x;
  }
}

module.exports.convert = CsvToAlphaConverter.convert;
