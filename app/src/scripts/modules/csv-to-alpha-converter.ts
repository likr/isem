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
   * @params {*} data
   * @returns {ng.IPromise<any>}
   */
  convert(data: any): ng.IPromise<any> {
    var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
    var $injector = rootElement.injector();
    var $q = $injector.get('$q');

    var deferred = $q.defer();

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

    var x = observedVariables.map((key: string): string[] => {
      return data.map((d: {[key: string]: string}): string => {
        return d[key];
      });
    });

    this.cov(x, (result: {data: number[][]}) => {
      var S = result.data;
      deferred.resolve({nodes: observedVariables, S: S});
    });

    return deferred.promise;
  }

  /**
   * This is a TENTATIVE
   *
   * @param data
   * @param callback
   * @returns {void}
   */
  private cov(data: any, callback: any) {
    var obj = {
      data: data
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (ev: Event) => {
      var req = <XMLHttpRequest>ev.currentTarget;
      if (req.readyState == 4 && req.status == 200) {
        callback(JSON.parse(req.responseText));
      }
    };
    xhr.open('POST', 'http://hyperinfo.viz.media.kyoto-u.ac.jp/wsgi/websem/cov');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));
  }
}

export = CsvToAlphaConverter;