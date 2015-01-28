module Svg {
  export declare class Point {
    x: number;
    y: number;
  }
}

module egrid {
  /**
   * @see {@link https://github.com/likr/egrid-core/blob/cce2cd81a30c098cb5d4a4cd38be92be5105b941/ts/egrid/grid.ts#L8}
   */
  export interface NodeInstance {
    index : number;
    x : number;
    y : number;
    baseWidth : number;
    baseHeight : number;
    width : number;
    height : number;
    theta : number;
    text : string;
    dagre : any;
    weight : number;
    key : number;
    original : boolean;
    isTop : boolean;
    isBottom : boolean;
    active : boolean;
    participants : string[];
  }

  export interface NodeConstructor {
    new(text: string, weight?: number, original?: boolean, participants?: string[]): NodeInstance;
  }

  /**
   * @see {@link https://github.com/likr/egrid-core/blob/cce2cd81a30c098cb5d4a4cd38be92be5105b941/ts/egrid/grid.ts#L82}
   */
  export interface LinkInstance {
    index : number;
    points : Svg.Point[];
    previousPoints : Svg.Point[];
    dagre : any;
    weight : number;
    key : number;
    source: NodeInstance;
    target: NodeInstance;
    coef: any;
  }

  export interface LinkConstructor {
    new(source: NodeInstance, target: NodeInstance, weight?: number): LinkInstance;
  }

  /**
   * @see {@link https://github.com/likr/egrid-core/blob/cce2cd81a30c098cb5d4a4cd38be92be5105b941/ts/egrid/sem.ts}
   */
  export interface SEMInstance {
    // extends from egrid.DAG
    nodes(): NodeInstance[];
    nodes(nodes: NodeInstance[]): SEMInstance;

    links() : LinkInstance[];
    links(links: LinkInstance[]): SEMInstance;

    registerUiCallback(callback: () => void): SEMInstance;
    display(regionWidth?: number, regionHeight?: number): (selection: D3.Selection) => void

    // declaration by egrid.SEM
    activeNodes(): NodeInstance[];
    activeLinks(): LinkInstance[];
    draw(): egrid.SEMInstance;
    focusCenter(): egrid.SEMInstance;
  }

}

/**
 * from root/app/lib/egrid.js
 */
declare var egrid: {
  sem(): egrid.SEMInstance;
  Node: egrid.NodeConstructor;
  Link: egrid.LinkConstructor;
};

/**
 * @see {@link http://hyperinfo.viz.media.kyoto-u.ac.jp/wsgi/websem/static/sem.js}
 */
declare var sem: (
  n: number,
  alpha: [number, number][],
  sigma: [number, number][],
  S: number[][],
  callback: Function
) => void;

declare var cov: (data: any, callback: Function) => void;

declare var typeSDict: {
  [node1Text: string]: {
    [node2Text: string]: number
  }
};

declare var typeNodesDict: {[nodeText: string]: number};

declare var typeLink: {source: number; target: number};

interface SemResult {
  GFI: number;
  alpha: number[][];
  sigma: number[][];
}

interface Scope extends ng.IScope {
  gfiValue: any;
  linkText: string;
  loadFile: Function;
  removeNode: Function;
  items: any;
}

angular.module('egrid-sem', [])
  .controller('SemController', ['$scope', function($scope: Scope) {
    var dag = egrid.sem();
    var SDict: typeof typeSDict;

    /**
     * @returns {void}
     */
    function calcPath() {
      var nodes = dag.activeNodes();
      var links = dag.activeLinks();

      // nodesDict
      var nodesDict: typeof typeNodesDict = {};
      nodes.forEach((node: egrid.NodeInstance, i: number) => {
        nodesDict[node.text] = i;
      });

      // sem() args
      var n = nodes.length;
      var alpha = links.map((link: egrid.LinkInstance): [number, number] => {
        return [nodesDict[link.source.text], nodesDict[link.target.text]];
      });
      var sigma = nodes.map((_: any, i: number): [number, number] => {
        return [i, i];
      });
      var S = nodes.map((node1: egrid.NodeInstance): number[] => {
        return nodes.map((node2: egrid.NodeInstance): number => {
          return SDict[node1.text][node2.text];
        });
      });

      sem(n, alpha, sigma, S, ((result: SemResult) => {
        var A: number[][] = nodes.map((_: any): number[] => {
          return nodes.map((_: any): number => {
            return 0;
          });
        });

        result.alpha.forEach((r: [number, number, number]) => {
          A[r[0]][r[1]] = r[2];
        });
        $scope.gfiValue = result.GFI;
        $scope.linkText = '結果,原因,係数\n';

        links.forEach((link: egrid.LinkInstance) => {
          link.coef = A[nodesDict[link.source.text]][nodesDict[link.target.text]];
          $scope.linkText += link.source.text + ',' + link.target.text + ',' + link.coef + '\n';
        });

        dag.draw().focusCenter();
        $scope.$apply();
      }));
    }

    /**
     * @param {string[]} nodes
     * @param {{source: number, target: number}[]} links
     * @param {number[][]} S
     * @returns {void}
     */
    function loadData(nodes: string[], links: Array<typeof typeLink>, S: number[][]) {
      SDict = {};

      nodes.forEach((node: string) => {
        SDict[node] = {};
      });
      nodes.forEach(function(node1: string, i: number) {
        nodes.forEach(function(node2: string, j: number) {
          SDict[node1][node2] = S[i][j];
        });
      });

      var egmNodes = nodes.map((d: string) => {
        return new egrid.Node(d);
      });
      var egmLinks = links.map((d: typeof typeLink) => {
        return new egrid.Link(egmNodes[d.target], egmNodes[d.source]);
      });

      dag.nodes(egmNodes).links(egmLinks);
      $scope.items = dag.nodes();

      var n = nodes.length;
      var alpha = links.map((d: typeof typeLink): [number, number] => {
        return [d.target, d.source];
      });
      var sigma = nodes.map((_: any, i: number): [number, number] => {
        return [i, i];
      });

      sem(n, alpha, sigma, S, ((result: SemResult) => {
        var A = dag.nodes().map((_: any) => {
          return dag.nodes().map((_: any) => {
            return 0;
          });
        });
        result.alpha.forEach((r: [number, number, number]) => {
          A[r[0]][r[1]] = r[2];
        });
        $scope.gfiValue = result.GFI;
        $scope.linkText = '結果,原因,係数\n';

        dag.links().forEach((link: egrid.LinkInstance) => {
          link.coef = A[link.source.index][link.target.index];
          $scope.linkText += link.source.text + ',' + link.target.text + ',' + link.coef + '\n';
        });

        dag.draw().focusCenter();
        $scope.$apply();
      }));
    }

    var nodes = [
      '総合評価',
      '使いたさ',
      '書きやすさ',
      '便利さ',
      '快適さ',
      '安心さ',
      '芯の太さ',
      '持ち運びやすさ',
      '持ちやすさ',
      '太さ',
      '重さ'
    ];

    var links = [
      {source: 1, target: 0},
      {source: 2, target: 0},
      {source: 3, target: 0},
      {source: 4, target: 0},
      {source: 5, target: 0},
      {source: 6, target: 2},
      {source: 8, target: 2},
      {source: 10, target: 2},
      {source: 7, target: 3},
      {source: 8, target: 3},
      {source: 8, target: 4},
      {source: 8, target: 5},
      {source: 10, target: 5},
      {source: 9, target: 7},
      {source: 10, target: 7},
      {source: 9, target: 8}
    ];

    var S = [ // @fm:off
      [1.180487805, 0.939634146, 1.021341463, 0.646341463, 0.96402439, 0.322560976, 0.058536585, 0.117682927, 1.021341463, -0.231097561, -0.170731707],
      [0.939634146, 1.18902439, 0.915243902, 0.565243902, 0.895731707, 0.176829268, 0.106097561, 0.055487805, 0.915243902, -0.132926829, -0.02195122],
      [1.021341463, 0.915243902, 1.552439024, 0.427439024, 1.007317073, 0.018292683, 0.06097561, 0.154878049, 1.552439024, -0.179268293, -0.369512195],
      [0.646341463, 0.565243902, 0.427439024, 1.102439024, 0.482317073, -0.031707317, -0.13902439, 0.179878049, 0.427439024, -0.104268293, -0.219512195],
      [0.96402439, 0.895731707, 1.007317073, 0.482317073, 1.07195122, 0.179878049, 0.057926829, 0.114634146, 1.007317073, -0.237804878, -0.133536585],
      [0.322560976, 0.176829268, 0.018292683, -0.031707317, 0.179878049, 0.962195122, 0.157317073, -0.038414634, 0.018292683, 0.030487805, 0.128658537],
      [0.058536585, 0.106097561, 0.06097561, -0.13902439, 0.057926829, 0.157317073, 0.474390244, -0.15304878, 0.06097561, 0.093292683, -0.087804878],
      [0.117682927, 0.055487805, 0.154878049, 0.179878049, 0.114634146, -0.038414634, -0.15304878, 0.809756098, 0.154878049, -0.308536585, -0.58902439],
      [1.021341463, 0.915243902, 1.552439024, 0.427439024, 1.007317073, 0.018292683, 0.06097561, 0.154878049, 1.552439024, -0.179268293, -0.369512195],
      [-0.231097561, -0.132926829, -0.179268293, -0.104268293, -0.237804878, 0.030487805, 0.093292683, -0.308536585, -0.179268293, 1.051219512, 0.509146341],
      [-0.170731707, -0.02195122, -0.369512195, -0.219512195, -0.133536585, 0.128658537, -0.087804878, -0.58902439, -0.369512195, 0.509146341, 1.256097561]
    ]; // @fm:on

    dag.registerUiCallback(function() {
      $scope.$apply();
      calcPath();
    });
    loadData(nodes, links, S);

    var width = $("#sem-analysis-display").width();
    var height = $("#sem-analysis-display").height();
    d3.select("#sem-analysis-display svg").call(dag.display(width, height));

    $scope.gfiValue = 0;

    /**
     * @function removeNode
     * @returns {void}
     */
    $scope.removeNode = function() {
      dag.draw().focusCenter();
      calcPath();
    };

    /**
     * @function loadFile
     * @returns {void}
     */
    $scope.loadFile = function() {
      var file = (<any>d3.select("#fileInput").node()).files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = d3.csv.parse((<any>e.target).result);
        var attributes: any[] = [];
        var attr: any;
        for (attr in data[0]) {
          attributes.push(attr);
        }
        var x = attributes.map(function(key: any) {
          return data.map(function(d: any) {
            return d[key];
          });
        });
        cov(x, function(cov: any) {
          var S = cov.data;
          loadData(attributes, [], S);
          $scope.$apply();
        });
      };
      reader.readAsText(file, (<any>d3.select(".encoding:checked").node()).value);
    }
  }]);
