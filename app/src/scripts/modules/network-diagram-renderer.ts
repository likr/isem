'use strict';
import typeVertex = require('./vertex');

import AbstractStore = require('../abstracts/store');
import Injector = require('../injector');
var angular  = Injector.angular() ;
var document = Injector.document();
var egrid    = Injector.egrid() ;
var log      = Injector.log();
var semjs    = Injector.semjs() ;

import IsemInjector = require('../isem-injector');
var app        = IsemInjector.app();
var Dispatcher = IsemInjector.NetworkDiagramDispatcher();
var styles     = IsemInjector.styles();

declare var edgeType: [number, number];
declare var listenerType: (ev: ng.IAngularEvent, ...args: any[]) => any;
export interface API {
  attributeArray: Array<{name: string; value: number}>;

  addListenerToChange     (listener: typeof listenerType): void;
  removeListenerFromChange(listener: typeof listenerType): void;

  addListenerToClickAddRelationButton     (listener: typeof listenerType): void;
  removeListenerFromClickAddRelationButton(listener: typeof listenerType): void;

  addListenerToClickManageRelation     (listener: typeof listenerType): void;
  removeListenerFromClickManageRelation(listener: typeof listenerType): void;

  addListenerToClickVertex     (listener: typeof listenerType): void;
  removeListenerFromClickVertex(listener: typeof listenerType): void;
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
  static CLICK_MANAGE_RELATION     = prefix + 'CLICK_MANAGE_RELATION';
  static CLICK_VERTEX              = prefix + 'CLICK_VERTEX';

  /* public */
  attributeArray: Array<{name: string; value: number}>;

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
    log.trace(log.t(), __filename, '#init()');
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
    return (_: any, graph: egrid.core.Graph<typeVertex.Props, any>) => {
      log.trace(log.t(), __filename, '#onUpdateDiagramCallback()');
      var egm = this.egm(graph);

      var render = () => {
        d3.select('#isem-svg-screen')
          .datum(graph)
          .transition()
          .call(<any>egm) // d3.d.ts does not support egrid.core.EGM
          .call(<any>egm.center());
      };
      render();

      if (graph.vertices().length <= 0) {return}

      this.calculate(graph).then(render);
    };
  }

  /**
   * @param {egrid.core.Graph} graph
   * @returns {egrid.core.EGM}
   */
  private egm(graph: egrid.core.Graph<typeVertex.Props, any>): egrid.core.EGM<typeVertex.Props, any> {
    log.trace(log.t(), __filename, '#egm()');
    var edgeTextFormat = d3.format('4.3g');
    var edgeWidthScale = d3.scale.linear()
      .domain([0, 2])
      .range([1, 3]);

    var size = [
      angular.element('isem-main-column').width(),
      angular.element('isem-network-diagram-display').height()
    ];

    return egrid.core.egm()
      .dagreRankSep(50)
      .dagreNodeSep(50)
      .size(size)
      .backgroundColor(styles.colors.diagramBackground)
      // vertices
      .vertexText        ((d: typeVertex.Props) => d.label)
      .vertexAveilability((d: typeVertex.Props) => d.enabled)
      .vertexColor((d: typeVertex.Props) => {
        return d.latent ? styles.colors.latentBackground : styles.colors.observedBackground
      })
      .strokeColor(styles.colors.stroke)
      .selectedStrokeColor(styles.colors.selectedStroke)
      .vertexButtons(this.vertexButtons())
      .onClickVertex((d: typeVertex.Props, u: number) => {
        this.publishClickVertex(u, null);
      })
      // edges
      .edgeColor((u: number, v: number) => {
        return (graph.get(u, v).coefficient >= 0) ? styles.colors.edgeColor1 : styles.colors.edgeColor2;
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
    var addRelation = {
      icon: '',
      onClick: (node: typeVertex.Props, u: number) => {
        this.publishClickAddRelationButton(u, null);
      }
    };

    var manageRelation = {
      icon: '',
      onClick: (node: typeVertex.Props, u: number) => {
        this.publishClickManageRelation(u, null);
      }
    };

    return [
      addRelation,
      manageRelation
    ];
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

  setattributeArray(attrs: Array<{name: string; value: number}>) {
    //this.attributes = attrs;

    // mocking
    this.attributeArray = [
      {name: 'Chi-square/df', value: Math.random()},
      {name: 'RMSEA',         value: Math.random()},
      {name: 'SRMR',          value: Math.random()},
      {name: 'GFI',           value: Math.random()},
      {name: 'AGFI',          value: Math.random()},
      {name: 'CFI',           value: Math.random()},
      {name: 'NFI',           value: Math.random()}
    ];

    this.publishChange();
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

  /* for clickManageRelation */
  addListenerToClickManageRelation(listener: typeof listenerType) {
    super.addListener(Renderer.CLICK_MANAGE_RELATION, listener);
  }

  removeListenerFromClickManageRelation(listener: typeof listenerType) {
    super.removeListener(Renderer.CLICK_MANAGE_RELATION, listener);
  }

  protected publishClickManageRelation(buttonId: number, err?: any) {
    super.publish(Renderer.CLICK_MANAGE_RELATION, err, buttonId);
  }

  /* for clickVertexButton */
  addListenerToClickVertex(listener: typeof listenerType) {
    super.addListener(Renderer.CLICK_VERTEX, listener);
  }

  removeListenerFromClickVertex(listener: typeof listenerType) {
    super.removeListener(Renderer.CLICK_VERTEX, listener);
  }

  protected publishClickVertex(vertexId: number, err?: any) {
    super.publish(Renderer.CLICK_VERTEX, err, vertexId);
  }
}

export var singleton = new Renderer();
