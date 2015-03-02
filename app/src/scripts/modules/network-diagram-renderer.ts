'use strict';
import Injector = require('../injector');
var angular = Injector.angular();
var egrid   = Injector.egrid();
var semjs   = Injector.semjs();

import IsemInjector = require('../isem-injector');
var app        = IsemInjector.app();
var Dispatcher = IsemInjector.NetworkDiagramDispatcher();

export interface API {
  addChangeListener   (listener: (ev: ng.IAngularEvent, ...args: any[]) => any): void;
  removeChangeListener(listener: (ev: ng.IAngularEvent, ...args: any[]) => any): void;
}

/**
 * @class
 * @classdesc Renderer has a role equivalent to the Store by the Flux-way
 */
class Renderer {
  /* local constant */
  static CHANGE_EVENT = 'NetworkDiagramRenderer:CHANGE_EVENT';

  /* private */
  private $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
  }

  /**
   * @returns {void}
   */
  private init() {
    var rootElement = <ng.IAugmentedJQuery>angular.element('.ng-scope').eq(0);
    this.$rootScope = rootElement.scope();

    this.registerWithDispatcher();
  }

  /**
   * @returns {void}
   */
  private registerWithDispatcher() {
    Dispatcher.onUpdateDiagram(this.onUpdateDiagramCallback());
  }

  /**
   * @returns {Function}
   */
  private onUpdateDiagramCallback(): (ev: ng.IAngularEvent, ...args: any[]) => any {
    return (_, graph) => {
      var egm = this.egm(graph);

      var selection = d3.select('#isem-svg-screen')
        .datum(graph)
        .call(egm)
        .call(egm.center());

      this.calculate(graph)
        .then(function() {
          selection.transition()
            .call(<any>egm) // d3.d.ts does not support egrid.core.EGM
            .call(<any>egm.center());
        });
    };
  }

  /**
   * @param {egrid.core.Graph} graph
   * @returns {egrid.core.EGM}
   */
  private egm(graph: egrid.core.Graph): egrid.core.EGM {
    var edgeTextFormat = d3.format('4.3g');
    var edgeWidthScale = d3.scale.linear()
      .domain([0, 2])
      .range([1, 3]);

    return egrid.core.egm()
      .dagreRankSep(50)
      .dagreNodeSep(50)
      .vertexText(function(d) {
        return d.label;
      })
      .vertexVisibility(function(d) {
        return d.enabled;
      })
      .vertexColor(function(d) {
        return d.latent ? '#eff' : '#fee';
      })
      .edgeColor(function(u, v) {
        return graph.get(u, v).coefficient >= 0 ? 'blue' : 'red';
      })
      .edgeWidth(function(u, v) {
        return edgeWidthScale(Math.abs(graph.get(u, v).coefficient));
      })
      .edgeText(function(u, v) {
        return edgeTextFormat(graph.get(u, v).coefficient);
      })
      .size([1000, 500])
      .onClickVertex(function() {
        console.log(arguments);
      })
      .selectedStrokeColor('#5f5');
  }

  /**
   * @param {egrid.core.Graph} graph
   * @returns {JQueryPromise<any>}
   */
  private calculate(graph: egrid.core.Graph): JQueryPromise<any> {
    var solver = semjs.solver();
    var variableIndices: any = {};
    var variableIds: any = {};
    var variables: number[] = graph.vertices()
      .filter(function(u: any) {
        return graph.get(u).enabled;
      })
      .map(function(u: any, i: any) {
        variableIndices[u] = i;
        variableIds[i] = u;
        return graph.get(u);
      });
    var n = variables.length;
    var sigma = variables.map(function(_: any, i: any) {
      return [i, i];
    });
    var S = semjs.stats.corrcoef(
      variables
        .filter(function(d: any) {
          return !d.latent;
        })
        .map(function(d: any) {
          return d.data;
        })
    );
    var alpha: any = graph.edges()
      .filter(function(edge: any) {
        return graph.get(edge[0]).enabled || graph.get(edge[1]).enabled;
      })
      .map(function(edge: any) {
        return [variableIndices[edge[0]], variableIndices[edge[1]]];
      });

    return solver(n, alpha, sigma, S)
      .then(function(result: any) {
        result.alpha.forEach(function(path: any) {
          var u = variableIds[path[0]];
          var v = variableIds[path[1]];
          graph.get(u, v).coefficient = path[2];
        });
      });
  }

  /**
   * For capsulize event name to other components
   *
   * @param {Function} listener
   * @returns {void}
   */
  addChangeListener(listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    if (!this.$rootScope) {this.init()}
    this.$rootScope.$on(Renderer.CHANGE_EVENT, listener);
  }

  /**
   * @param {Function} listener
   * @returns {void}
   */
  removeChangeListener(listener: (ev: ng.IAngularEvent, ...args: any[]) => any) {
    var listeners = (<any>this.$rootScope).$$listeners[Renderer.CHANGE_EVENT];
    app.removeListener(listeners, listener);
  }

  /**
   * @param {*} err
   * @returns {void}
   */
  private publishChange(err?: any) {
    this.$rootScope.$broadcast(Renderer.CHANGE_EVENT, err);
  }
}

export var singleton = new Renderer();
