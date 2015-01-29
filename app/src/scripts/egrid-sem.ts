angular.module(isem.appName).controller('SemController', [
    '$scope',
    'egrid',
    'sem',
    'cov',
    'd3',
    'jquery',
    function($scope: Scope, _egrid: ModuleEgrid, _sem: typeof sem, _cov: typeof cov, _d3: D3.Base, $: JQueryStatic) {
      var dag = _egrid.sem();
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

        _sem(n, alpha, sigma, S, ((result: SemResult) => {
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

        _sem(n, alpha, sigma, S, ((result: SemResult) => {
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

      dag.registerUiCallback(() => {
        $scope.$apply();
        calcPath();
      });
      loadData(nodes, links, S);

      var width = $('#sem-analysis-display').width();
      var height = $('#sem-analysis-display').height();
      _d3.select('#sem-analysis-display svg').call(dag.display(width, height));

      $scope.gfiValue = 0;

      /**
       * @function removeNode
       * @returns {void}
       */
      $scope.removeNode = () => {
        dag.draw().focusCenter();
        calcPath();
      };

      /**
       * @function loadFile
       * @returns {void}
       */
      $scope.loadFile = () => {
        var file = (<any>_d3.select('#fileInput').node()).files[0];
        var reader = new FileReader();
        reader.onload = (e: egrid.EventAltered) => {
          var data = _d3.csv.parse(e.target.result);
          var attributes: string[] = [];
          var attr: string;
          for (attr in data[0]) {
            attributes.push(attr);
          }
          var x = attributes.map((key: string): string[] => {
            return data.map((d: {[key: string]: string}): string => {
              return d[key];
            });
          });
          _cov(x, (cov: {data: number[][]}) => {
            var S = cov.data;
            loadData(attributes, [], S);
            $scope.$apply();
          });
        };
        reader.readAsText(file, (<any>_d3.select('.encoding:checked').node()).value);
      }
    }
  ]);
