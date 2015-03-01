'use strict';
import Injector = require('../../../../scripts/injector');
var angular = Injector.angular();
var d3      = Injector.d3();
var egrid   = Injector.egrid();
var semjs   = Injector.semjs();

import IsemInjector = require('../../../../scripts/isem-injector');
var app = IsemInjector.app();

interface Scope extends ng.IScope {
  graph: egrid.core.Graph;
}

class Controller {
  /**
   * @constructor
   * @ngInject
   */
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $scope: Scope
  ) {
    var graph = this.$scope.graph;
    var edgeTextFormat = d3.format('4.3g');
    var edgeWidthScale = d3.scale.linear()
      .domain([0, 2])
      .range([1, 3]);

    var egm = egrid.core.egm()
      .dagreRankSep(50)
      .dagreNodeSep(50)
      .vertexText(function(d) {
        return d.label;
      })
      .vertexVisibility(function(d) {
        return !d.disabled;
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

    this.$rootScope.$on('updateGraph', () => {
      var graph = this.$scope.graph;
      var selection = d3.select('#isem-svg-screen')
        .datum(graph)
        .call(egm)
        .call(egm.center());

      console.log('updateGraph', graph);
      if (!graph) {
        return;
      }

      var vertices = graph.vertices();
      graph.addEdge(vertices[0], vertices[6], {}); // 総熱量               <- 洋食傾向
      graph.addEdge(vertices[1], vertices[6], {}); // 肉類                 <- 洋食傾向
      graph.addEdge(vertices[2], vertices[6], {}); // 乳製品               <- 洋食傾向
      graph.addEdge(vertices[3], vertices[6], {}); // 酒類                 <- 洋食傾向
      graph.addEdge(vertices[7], vertices[6], {}); // 下部消化管のガン傾向 <- 洋食傾向
      graph.addEdge(vertices[4], vertices[7], {}); // 大腸ガン             <- 下部消化管のガン傾向
      graph.addEdge(vertices[5], vertices[7], {}); // 直腸ガン             <- 下部消化管のガン傾向

      Controller.calculate(graph)
        .then(function() {
          (<any>selection.transition())
            .call(egm)
            .call(egm.center());
        });
    });
  }

  static calculate(graph: any) {
    var solver = semjs.solver();
    var variableIndices: any = {};
    var variableIds: any = {};
    var variables = graph.vertices()
      .filter(function(u: any) {
        return !graph.get(u).disabled;
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
    var alpha = graph.edges()
      .filter(function(edge: any) {
        return !graph.get(edge[0]).disabled && !graph.get(edge[1]).disabled;
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
}

function ddo() {
  return {
    restrict: 'E',
    controller: Controller,
    controllerAs: 'Controller',
    templateUrl: app.viewsDir.networkDiagram + 'display/display.html',
    scope: {}
  }
}

angular.module(app.appName).directive('isemNetworkDiagramDisplay', ddo);
