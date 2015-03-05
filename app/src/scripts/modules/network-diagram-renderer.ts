'use strict';
import typeVertex = require('./vertex');

import AbstractStore = require('../abstracts/store');
import Injector = require('../injector');
var angular = Injector.angular();
var egrid   = Injector.egrid();
var semjs   = Injector.semjs();

import IsemInjector = require('../isem-injector');
var app        = IsemInjector.app();
var Dispatcher = IsemInjector.NetworkDiagramDispatcher();

declare var edgeType: [number, number];
declare var listenerType: (ev: ng.IAngularEvent, ...args: any[]) => any;
export interface API {
  addListenerToChange     (listener: typeof listenerType): void;
  removeListenerFromChange(listener: typeof listenerType): void;

  addListenerToClickAddRelationButton     (listener: typeof listenerType): void;
  removeListenerFromClickAddRelationButton(listener: typeof listenerType): void;
}

var prefix = 'NetworkDiagramRenderer:';
/**
 * @class
 * @classdesc Renderer has a role equivalent to the Store by the Flux-way
 */
class Renderer extends AbstractStore {
  /* local constant */
  static CHANGE                    = prefix + 'CHANGE';
  static CLICK_ADD_RELATION_BUTTON = prefix + 'CLICK_ADD_RELATION_BUTTON';

  /* protected */
  protected $rootScope: ng.IRootScopeService;

  /**
   * @constructor
   */
  constructor() {
    super();
    // DO NOT call #init() here because rootElement hasn't been rendered yet.
  }

  /**
   * @returns {void}
   */
  protected init() {
    super.init();
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
  private onUpdateDiagramCallback(): typeof listenerType {
    return (_: any, graph: egrid.core.Graph) => {
      var egm = this.egm(graph);
      var selection = d3.select('#isem-svg-screen')
        .datum(graph)
        .call(egm)
        .call(egm.center());

      this.calculate(graph).then(() => {
        selection
          .transition()
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

    var color = {
      latent:         '#eff',
      observed:       '#fee',
      selectedStroke: '#5f5'
    };

    return egrid.core.egm()
      .dagreRankSep(50)
      .dagreNodeSep(50)
      .size([1000, 500])
      // vertices
      .vertexText      ((d: typeVertex.Props) => d.label)
      .vertexVisibility((d: typeVertex.Props) => d.enabled)
      .vertexColor((d: typeVertex.Props) => {
        return d.latent ? color.latent : color.observed
      })
      .selectedStrokeColor(color.selectedStroke)
      .vertexButtons(this.vertexButtons())
      .onClickVertex(() => {
        console.log(arguments);
      })
      // edges
      .edgeColor((u: number, v: number) => {
        return (graph.get(u, v).coefficient >= 0) ? 'blue' : 'red';
      })
      .edgeWidth((u: number, v: number) => {
        return edgeWidthScale(Math.abs(graph.get(u, v).coefficient));
      })
      .edgeText((u: number, v: number) => {
        return edgeTextFormat(graph.get(u, v).coefficient);
      });
  }

  /**
   * @returns {egrid.core.VertexButton[]}
   */
  private vertexButtons(): egrid.core.VertexButton[] {
    var addRelationButton = {
      icon: '',
      onClick: (node: typeVertex.Props, u: number) => {
        this.publishClickAddRelationButton(u, null);
      }
    };

    return [addRelationButton];
  }

  /**
   * @param {egrid.core.Graph} graph
   * @returns {JQueryPromise<any>}
   */
  private calculate(graph: egrid.core.Graph): JQueryPromise<any> {
    var solver = semjs.solver();

    var variableIndices: {[u: number]: number} = {};
    var variableIds: {[i: number]: number} = {};

    var variables: typeVertex.Props[] = graph.vertices()
      .filter((u: number) => {
        return graph.get(u).enabled;
      })
      .map((u: number, i: number) => {
        variableIndices[u] = i;
        variableIds[i] = u;
        return graph.get(u);
      });

    var n = variables.length;

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
        result.alpha.forEach((path: any) => {
          var u = variableIds[path[0]];
          var v = variableIds[path[1]];
          graph.get(u, v).coefficient = path[2];
        });
      });
  }

  /* for change */
  addListenerToChange(listener: typeof listenerType) {
    super.addListener(Renderer.CHANGE, listener);
  }

  removeListenerFromChange(listener: typeof listenerType) {
    super.removeListener(Renderer.CHANGE, listener);
  }

  protected publishChange(err?: any) {
    super.publish(Renderer.CHANGE, err);
  }

  /* for clickVertexButton */
  addListenerToClickAddRelationButton(listener: typeof listenerType) {
    super.addListener(Renderer.CLICK_ADD_RELATION_BUTTON, listener);
  }

  removeListenerFromClickAddRelationButton(listener: typeof listenerType) {
    super.removeListener(Renderer.CLICK_ADD_RELATION_BUTTON, listener);
  }

  protected publishClickAddRelationButton(buttonId: number, err?: any) {
    super.publish(Renderer.CLICK_ADD_RELATION_BUTTON, err, buttonId);
  }
}

export var singleton = new Renderer();