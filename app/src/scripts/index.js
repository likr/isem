angular.module('cov-injector', []).factory('cov', function () {
    return cov;
});
angular.module('d3-injector', []).factory('d3', function () {
    return d3;
});
angular.module('egrid-injector', []).factory('egrid', function () {
    return egrid;
});
angular.module('jQuery-injector', []).factory('jQuery', function () {
    return jQuery;
});
angular.module('sem-injector', []).factory('sem', function () {
    return sem;
});
var isem;
(function (isem) {
    isem.appName = 'egrid-sem';
    isem.externalModules = [
        'egrid-injector',
        'sem-injector',
        'cov-injector',
        'd3-injector',
        'jQuery-injector'
    ];
})(isem || (isem = {}));
angular.module(isem.appName, isem.externalModules);
angular.module(isem.appName).factory('initializationData', function () {
    return {
        nodes: [
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
        ],
        links: [
            { source: 1, target: 0 },
            { source: 2, target: 0 },
            { source: 3, target: 0 },
            { source: 4, target: 0 },
            { source: 5, target: 0 },
            { source: 6, target: 2 },
            { source: 8, target: 2 },
            { source: 10, target: 2 },
            { source: 7, target: 3 },
            { source: 8, target: 3 },
            { source: 8, target: 4 },
            { source: 8, target: 5 },
            { source: 10, target: 5 },
            { source: 9, target: 7 },
            { source: 10, target: 7 },
            { source: 9, target: 8 }
        ],
        S: [
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
        ] // @fm:on
    };
});
var isem;
(function (isem) {
    var SemController = (function () {
        /**
         * @constructor
         * @ngInject
         */
        function SemController(// @fm:off
            $scope, egrid, sem, cov, d3, jQuery, initializationData) {
            this.$scope = $scope;
            this.egrid = egrid;
            this.sem = sem;
            this.cov = cov;
            this.d3 = d3;
            this.jQuery = jQuery;
            this.initializationData = initializationData;
            this.dag = this.egrid.sem();
            this.init();
            this.bindToScope();
        }
        /**
         * Initialize the controller.
         *
         * @returns {void}
         */
        SemController.prototype.init = function () {
            var _this = this;
            this.$scope.gfiValue = 0;
            this.dag.registerUiCallback(function () {
                _this.$scope.$apply();
                _this.calcPath();
            });
            this.loadData(this.initializationData.nodes, this.initializationData.links, this.initializationData.S);
            var displayId = '#sem-analysis-display';
            var display = this.jQuery(displayId);
            this.d3.select([displayId, 'svg'].join(' ')).call(this.dag.display(display.width(), display.height()));
        };
        /**
         * Bind function to $scope.
         */
        SemController.prototype.bindToScope = function () {
            this.$scope.removeNode = this.removeNode.bind(this);
            this.$scope.loadFile = this.loadFile.bind(this);
        };
        /**
         * @returns {void}
         */
        SemController.prototype.calcPath = function () {
            var _this = this;
            var nodes = this.dag.activeNodes();
            var links = this.dag.activeLinks();
            // nodesDict
            var nodesDict = {};
            nodes.forEach(function (node, i) {
                nodesDict[node.text] = i;
            });
            // sem() args
            var n = nodes.length;
            var alpha = links.map(function (link) {
                return [nodesDict[link.source.text], nodesDict[link.target.text]];
            });
            var sigma = nodes.map(function (_, i) {
                return [i, i];
            });
            var S = nodes.map(function (node1) {
                return nodes.map(function (node2) {
                    return _this.SDict[node1.text][node2.text];
                });
            });
            this.sem(n, alpha, sigma, S, (function (result) {
                var A = nodes.map(function (_) {
                    return nodes.map(function (_) {
                        return 0;
                    });
                });
                result.alpha.forEach(function (r) {
                    A[r[0]][r[1]] = r[2];
                });
                _this.$scope.gfiValue = result.GFI;
                _this.$scope.linkText = '結果,原因,係数\n';
                links.forEach(function (link) {
                    link.coef = A[nodesDict[link.source.text]][nodesDict[link.target.text]];
                    _this.$scope.linkText += link.source.text + ',' + link.target.text + ',' + link.coef + '\n';
                });
                _this.dag.draw().focusCenter();
                _this.$scope.$apply();
            }));
        };
        /**
         * @param {string[]} nodes
         * @param {{source: number, target: number}[]} links
         * @param {number[][]} S
         * @returns {void}
         */
        SemController.prototype.loadData = function (nodes, links, S) {
            var _this = this;
            this.SDict = {};
            nodes.forEach(function (node) {
                _this.SDict[node] = {};
            });
            nodes.forEach(function (node1, i) {
                nodes.forEach(function (node2, j) {
                    _this.SDict[node1][node2] = S[i][j];
                });
            });
            var egmNodes = nodes.map(function (d) {
                return new egrid.Node(d);
            });
            var egmLinks = links.map(function (d) {
                return new egrid.Link(egmNodes[d.target], egmNodes[d.source]);
            });
            this.dag.nodes(egmNodes).links(egmLinks);
            this.$scope.items = this.dag.nodes();
            var n = nodes.length;
            var alpha = links.map(function (d) {
                return [d.target, d.source];
            });
            var sigma = nodes.map(function (_, i) {
                return [i, i];
            });
            this.sem(n, alpha, sigma, S, (function (result) {
                var A = _this.dag.nodes().map(function (_) {
                    return _this.dag.nodes().map(function (_) {
                        return 0;
                    });
                });
                result.alpha.forEach(function (r) {
                    A[r[0]][r[1]] = r[2];
                });
                _this.$scope.gfiValue = result.GFI;
                _this.$scope.linkText = '結果,原因,係数\n';
                _this.dag.links().forEach(function (link) {
                    link.coef = A[link.source.index][link.target.index];
                    _this.$scope.linkText += link.source.text + ',' + link.target.text + ',' + link.coef + '\n';
                });
                _this.dag.draw().focusCenter();
                _this.$scope.$apply();
            }));
        };
        /**
         * @returns {void}
         */
        SemController.prototype.removeNode = function () {
            this.dag.draw().focusCenter();
            this.calcPath();
        };
        /**
         * @returns {void}
         */
        SemController.prototype.loadFile = function () {
            var _this = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = _this.d3.csv.parse(e.target.result);
                var attributes = [];
                var attr;
                for (attr in data[0]) {
                    attributes.push(attr);
                }
                var x = attributes.map(function (key) {
                    return data.map(function (d) {
                        return d[key];
                    });
                });
                _this.cov(x, function (cov) {
                    var S = cov.data;
                    _this.loadData(attributes, [], S);
                    _this.$scope.$apply();
                });
            };
            var file = document.getElementById('fileInput').files[0];
            var encoding = document.querySelectorAll('.encoding:checked')[0].value;
            reader.readAsText(file, encoding);
        };
        return SemController;
    })();
    isem.SemController = SemController;
})(isem || (isem = {}));
angular.module(isem.appName).controller('SemController', isem.SemController);
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="for-egrid-sem.d.ts" />
/// <reference path="injector/cov.ts" />
/// <reference path="injector/d3.ts" />
/// <reference path="injector/egrid.ts" />
/// <reference path="injector/jquery.ts" />
/// <reference path="injector/sem.ts" />
/// <reference path="app.ts" />
/// <reference path="factory/initialization-data.ts" />
/// <reference path="egrid-sem.ts" /> 
//# sourceMappingURL=index.js.map