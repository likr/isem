module isem {
  export class SemController {
    private dag: egrid.SEMInstance;
    private SDict: typeof typeSDict;

    /**
     * @constructor
     * @ngInject
     */
    constructor( // @fm:off
      private $scope: Scope,
      private egrid: ModuleEgrid,
      private sem: typeof typeSem,
      private cov: typeof typeCov,
      private d3: D3.Base,
      private jQuery: JQueryStatic,
      private initializationData: isem.initializationData
    ) { // @fm:on
      this.dag = this.egrid.sem();
      this.init();
      this.bindToScope();
    }

    /**
     * Initialize the controller.
     *
     * @see egrid.DAG#registerUiCallback() {@link http://git.io/Fj4M}
     * @see egrid.SEM#display() {@link http://git.io/FjBP}
     * @returns {void}
     */
    private init() {
      this.$scope.gfiValue = 0;

      // The callback is called DAG.notify()
      // everywhere drawing D3 methods.
      this.dag.registerUiCallback(() => {
        this.$scope.$apply();
        this.calcPath();
      });

      this.loadData(
        this.initializationData.nodes,
        this.initializationData.links,
        this.initializationData.S
      );

      var displayId = '#sem-analysis-display';
      var display = this.jQuery(displayId);
      this.d3
        .select([displayId, 'svg'].join(' '))
        .call(this.dag.display(display.width(), display.height()));
    }

    /**
     * Bind function to $scope.
     */
    private bindToScope() {
      this.$scope.removeNode = this.removeNode.bind(this);
      this.$scope.loadFile = this.loadFile.bind(this);
    }

    /**
     * @see SEM#focusCenter() {@link http://git.io/bkOK}
     * @returns {void}
     */
    private calcPath() {
      var nodes = this.dag.activeNodes();
      var links = this.dag.activeLinks();

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
          return this.SDict[node1.text][node2.text];
        });
      });

      this.sem(n, alpha, sigma, S, ((result: SemResult) => {
        // make A
        var A: number[][] = nodes.map((_: any): number[] => {
          return nodes.map((_: any): number => {
            return 0;
          });
        });
        result.alpha.forEach((r: [number, number, number]) => {
          A[r[0]][r[1]] = r[2];
        });

        // update $scope
        this.$scope.gfiValue = result.GFI;
        this.$scope.linkText = '結果,原因,係数\n';
        links.forEach((link: egrid.LinkInstance) => {
          link.coef = A[nodesDict[link.source.text]][nodesDict[link.target.text]];
          this.$scope.linkText += link.source.text + ',' + link.target.text + ',' + link.coef + '\n';
        });

        // render
        this.dag.draw().focusCenter();
        this.$scope.$apply();
      }));
    }

    /**
     * @param {string[]} nodes
     * @param {{source: number, target: number}[]} links
     * @param {number[][]} S
     * @returns {void}
     */
    private loadData(nodes: string[], links: Array<typeof typeLink>, S: number[][]) {
      // SDict
      this.SDict = {};
      nodes.forEach((node: string) => {
        this.SDict[node] = {};
      });
      nodes.forEach((node1: string, i: number) => {
        nodes.forEach((node2: string, j: number) => {
          this.SDict[node1][node2] = S[i][j];
        });
      });

      // egm
      var egmNodes = nodes.map((d: string) => {
        return new egrid.Node(d);
      });
      var egmLinks = links.map((d: typeof typeLink) => {
        return new egrid.Link(egmNodes[d.target], egmNodes[d.source]);
      });
      this.dag.nodes(egmNodes).links(egmLinks);
      // NOTICE! Sharing of a nodes' pointer. Maybe this is like a binding for $scope.
      this.$scope.items = this.dag.nodes();

      // sem() args
      var n = nodes.length;
      var alpha = links.map((d: typeof typeLink): [number, number] => {
        return [d.target, d.source];
      });
      var sigma = nodes.map((_: any, i: number): [number, number] => {
        return [i, i];
      });

      this.sem(n, alpha, sigma, S, ((result: SemResult) => {
        // make A
        var A = this.dag.nodes().map((_: any) => {
          return this.dag.nodes().map((_: any) => {
            return 0;
          });
        });
        result.alpha.forEach((r: [number, number, number]) => {
          A[r[0]][r[1]] = r[2];
        });

        // update $scope
        this.$scope.gfiValue = result.GFI;
        this.$scope.linkText = '結果,原因,係数\n';
        this.dag.links().forEach((link: egrid.LinkInstance) => {
          link.coef = A[link.source.index][link.target.index];
          this.$scope.linkText += link.source.text + ',' + link.target.text + ',' + link.coef + '\n';
        });

        // render
        this.dag.draw().focusCenter();
        this.$scope.$apply();
      }));
    }

    /**
     * @returns {void}
     */
    removeNode() {
      // This has none of a process the deleting.
      // Had better named this updateDisplayOnToggleItems().
      this.dag.draw().focusCenter();
      this.calcPath();
    }

    /**
     * @returns {void}
     */
    loadFile() {
      var reader = new FileReader();
      reader.onload = (e: egrid.EventAltered) => {
        var data = this.d3.csv.parse(e.target.result);

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

        this.cov(x, (cov: {data: number[][]}) => {
          var S = cov.data;
          this.loadData(attributes, [], S);
          this.$scope.$apply();
        });
      };

      var file = (<HTMLInputElement>document.getElementById('fileInput')).files[0];
      var encoding = (<HTMLInputElement>document.querySelectorAll('.encoding:checked')[0]).value;
      reader.readAsText(file, encoding);
    }
  }
}

angular.module(isem.appName).controller('SemController', isem.SemController);
