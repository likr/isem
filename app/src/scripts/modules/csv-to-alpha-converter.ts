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
  convert(data: any): any {
    var observedVariables = ((data: any) => {
      var vars: string[] = [];
      var v: string;
      for (v in data) {
        if (data.hasOwnProperty(v)) {
          vars.push(v);
        }
      }
      return vars;
    })(data[0]);

    var S = ((vars: string[], data: any) => {
      var x = vars.map((key: string): number[] => {
        return data.map((d: {[key: string]: number}): number => {
          return d[key];
        });
      });
      return semjs.stats.cov(x);
    })(observedVariables, data);

    return {nodes: observedVariables, S: S};
  }
}

export = CsvToAlphaConverter;