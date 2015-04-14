'use strict';
import typeVertex = require('./vertex');

import AbstractStore = require('../abstracts/store');
import injector = require('../injector');
var angular    = injector.angular();
var app        = injector.app();
var Dispatcher = injector.NetworkDiagramDispatcher();
var egrid      = injector.egrid();
var log        = injector.log();
var semjs      = injector.semjs();

declare var edgeType: [number, number];
declare var listenerType: (ev: ng.IAngularEvent, ...args: any[]) => any;
export interface API {
  attributeArray: Array<{name: string; value: number}>;
  addListener(listener: typeof listenerType): any;
}

export interface EgmHandlers {
  onClickVertex: (d: typeVertex.Props, vertexId: number) => void;
  vertexButtons: egrid.core.VertexButton[];
}

/**
 * @class
 * @classdesc Renderer has a role equivalent to the Store by the Flux-way
 */
class Renderer extends AbstractStore {
  /* local constant */
  static CHANGE = 'NetworkDiagramRenderer:CHANGE';

  /* public */
  attributeArray: Array<{name: string; value: number}>;

  /* protected */
  protected $rootScope: ng.IRootScopeService;

  /* private */
  private egm: egrid.core.EGM<typeVertex.Props, any>;

  /**
   * @constructor
   */
  constructor() {
    super();
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
  }

  /**
   * @param {function(ev: ng.IAngularEvent, ...args: *[]): *} listener
   * @returns {{dispose: (function(): void)}}
   */
  addListener(listener: typeof listenerType): {dispose(): any} {
    return super.baseAddListener(Renderer.CHANGE, listener);
  }

  /**
   * @param {*} err
   * @returns {void}
   */
  protected publish(err?: any) {
    super.basePublish(Renderer.CHANGE, err);
  }

  /**
   * @returns {void}
   */
  protected init() {
    super.init();
    log.trace(log.t(), __filename, '#init()');

    Dispatcher.addHandlers({
      addEgmHandlers: this.addEgmHandlers.bind(this),
      updateDiagram:  this.updateDiagram .bind(this)
    });
  }

  /**
   * @param {*} e - event non-use
   * @param {EgmHandlers} handlers
   * @returns {void}
   */
  private addEgmHandlers(e: any, handlers: EgmHandlers) {
    if (!this.egm) {
      this.publish(new Error('The egm has not been initialized'));
      return;
    }

    this.egm
      .onClickVertex(handlers.onClickVertex)
      .vertexButtons(handlers.vertexButtons);
  }

  /**
   * @param {*} e - event non-use
   * @param {egrid.core.Graph} graph
   * @returns {void}
   */
  private updateDiagram(e: any, graph: egrid.core.Graph<typeVertex.Props, any>) {
    log.trace(log.t(), __filename, '#updateDiagram()', graph);

    this.initEgm(graph);
    this.egm.size([
      angular.element('isem-main-column').width(),
      angular.element('isem-network-diagram-display').height()
    ]);

    var render = () => {
      d3.select('#isem-svg-screen')
        .datum(graph)
        .transition()
        .call(<any>this.egm) // d3.d.ts does not support egrid.core.EGM
        .call(<any>this.egm.center());
    };
    render();

    if (graph.vertices().length <= 0) {return}
    this.calculate(graph).then(render);
  }

  /**
   * Initialize egrid.core.egm() only once
   *
   * @param {egrid.core.Graph} graph
   * @returns {void}
   */
  private initEgm(graph: egrid.core.Graph<typeVertex.Props, any>) {
    this.egm = this.egm || this.defaultEgm(graph);
  }

  /**
   * @param {egrid.core.Graph} graph
   * @returns {egrid.core.EGM}
   */
  private defaultEgm(graph: egrid.core.Graph<typeVertex.Props, any>): egrid.core.EGM<typeVertex.Props, any> {
    log.trace(log.t(), __filename, '#defaultEgm()');

    var edgeTextFormat = d3.format('4.3g');
    var edgeWidthScale = d3.scale.linear()
      .domain([0, 2])
      .range([1, 3]);

    var colors = {
      diagramBackground:  '#ffffff',
      edgeColor1:         '#71a9f7', // ugly property name!!
      edgeColor2:         '#df3b57',
      latentBackground:   '#f2cee0',
      observedBackground: '#e3f6fd',
      selectedStroke:     '#daf984',
      stroke:             '#1f1d1e'
    };

    return egrid.core.egm()
      .dagreRankSep(50)
      .dagreNodeSep(50)
      .backgroundColor(colors.diagramBackground)
      // vertices
      .vertexText        ((d: typeVertex.Props) => d.label)
      .vertexAveilability((d: typeVertex.Props) => d.enabled)
      .vertexColor((d: typeVertex.Props) => {
        return d.latent ? colors.latentBackground : colors.observedBackground
      })
      .maxTextLength(30)
      .strokeColor(colors.stroke)
      .selectedStrokeColor(colors.selectedStroke)
      // edges
      .edgeColor((u: number, v: number) => {
        return (graph.get(u, v).coefficient >= 0) ? colors.edgeColor1 : colors.edgeColor2;
      })
      .edgeWidth((u: number, v: number) => {
        return edgeWidthScale(Math.abs(graph.get(u, v).coefficient));
      })
      .edgeText((u: number, v: number) => {
        return edgeTextFormat(graph.get(u, v).coefficient);
      });
  }

  /**
   * @param {egrid.core.Graph} graph
   * @returns {JQueryPromise<any>}
   */
  private calculate(graph: egrid.core.Graph<typeVertex.Props, any>): JQueryPromise<any> {
    log.trace(log.t(), __filename, '#calculate()');
    var solver = semjs.solver();

    var variableIndices: {[u: number]: number} = {};
    var variableIds: {[i: number]: number} = {};

    var variables: Array<typeVertex.Props> = graph.vertices()
      .filter((u: number) => {
        return graph.get(u).enabled;
      })
      .map((u: number, i: number) => {
        variableIndices[u] = i;
        variableIds[i] = u;
        return graph.get(u);
      });

    var n = variables.length;

    if (n === 1) {
      // solver() returns an error when a length is 1.
      log.warn(log.t(), __filename, '#calculate(), variables.length === 1, aborting');
      return <any>{then: (cb: any) => cb()};
    }
    if (n < 1) {
      // Occurs TypeError at semjs/src/stats/cov.coffee#L3
      // http://git.io/pIS8
      log.warn(log.t(), __filename, '#calculate(), variables.length < 1, aborting');
      return <any>{then: (cb: any) => cb()};
    }

    var alpha: Array<typeof edgeType> = graph.edges()
      .filter((edge: typeof edgeType): boolean => {
        return graph.get(edge[0]).enabled || graph.get(edge[1]).enabled;
      })
      .map<typeof edgeType>((edge: typeof edgeType): typeof edgeType => {
        return [variableIndices[edge[0]], variableIndices[edge[1]]];
      });

    var sigma: Array<typeof edgeType> = variables.map<typeof edgeType>((_: any, i: number) => {
      return [i, i];
    });

    var S = semjs.stats.corrcoef(
      variables
        .filter((d: typeVertex.Props) => {
          return !d.latent;
        })
        .map((d: typeVertex.Props) => {
          return d.data;
        })
    );

    return solver(n, alpha, sigma, S)
      .then((result: any) => {
        log.debug(log.t(), __filename, '#calculate() solver then', result.attributes);
        result.alpha.forEach((path: any) => {
          var u = variableIds[path[0]];
          var v = variableIds[path[1]];
          graph.get(u, v).coefficient = path[2];
        });
        this.setattributeArray(result.attributes);
      });
  }

  /**
   * @param {{name: string, value: number}[]} attrs
   * @returns {void}
   */
  setattributeArray(attrs: Array<{name: string; value: number}>) {
    this.attributeArray = attrs;
    this.publish();
  }
}

export var singleton = new Renderer();
