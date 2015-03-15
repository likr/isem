'use strict';

export interface API {
  convert(data: Array<{[label: string]: string}>): {labels: string[]; dataArray: number[][]};
}

class CsvToEgridConverter {
  /**
   * @params {Array} data
   * @returns {Object}
   */
  static convert(data: Array<{[label: string]: string}>): {labels: string[]; dataArray: number[][]} {
    var singleData = data[0];
    var labels    = CsvToEgridConverter.makeLabels(singleData);
    var dataArray = CsvToEgridConverter.makeDataArray(data, labels);
    return {labels: labels, dataArray: dataArray};
  }

  /**
   * @param {Object} data
   * @returns {string[]}
   */
  private static makeLabels(data: {[label: string]: string}): string[] {
    var labels: string[] = [];
    var v: string;
    for (v in data) {
      if (data.hasOwnProperty(v)) {labels.push(v);}
    }
    return labels;
  }

  /**
   * @param {*} data
   * @param {string[]} labels
   * @returns {number[][]}
   */
  private static makeDataArray(data: Array<{[label: string]: string}>, labels: string[]): number[][] {
    var x = labels.map((key: string) => {
      return data.map((d: {[label: string]: string}) => {
        return parseFloat(d[key]);
      });
    });
    return x;
  }
}

module.exports.convert = CsvToEgridConverter.convert;
