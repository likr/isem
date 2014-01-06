var Svg;
(function (Svg) {
    (function (Transform) {
        var Translate = (function () {
            function Translate(x, y) {
                this.x = x;
                this.y = y;
            }
            Translate.prototype.toString = function () {
                return "translate(" + this.x + "," + this.y + ")";
            };
            return Translate;
        })();
        Transform.Translate = Translate;

        var Scale = (function () {
            function Scale(sx, sy) {
                if (typeof sy === "undefined") { sy = undefined; }
                this.sx = sx;
                this.sy = sy;
            }
            Scale.prototype.toString = function () {
                if (this.sy) {
                    return "scale(" + this.sx + "," + this.sy + ")";
                } else {
                    return "scale(" + this.sx + ")";
                }
            };
            return Scale;
        })();
        Transform.Scale = Scale;

        var Rotate = (function () {
            function Rotate(angle) {
                this.angle = angle;
            }
            Rotate.prototype.toString = function () {
                return "rotate(" + this.angle + ")";
            };
            return Rotate;
        })();
        Transform.Rotate = Rotate;
    })(Svg.Transform || (Svg.Transform = {}));
    var Transform = Svg.Transform;

    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    })();
    Svg.Point = Point;

    var Rect = (function () {
        function Rect(x, y, width, height, theta) {
            if (typeof theta === "undefined") { theta = 0; }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.theta = theta;
        }
        Rect.prototype.left = function () {
            return new Point(-this.width / 2 * Math.cos(this.theta) + this.x, this.width / 2 * Math.sin(this.theta) + this.y);
        };

        Rect.prototype.right = function () {
            return new Point(this.width / 2 * Math.cos(this.theta) + this.x, this.width / 2 * Math.sin(this.theta) + this.y);
        };

        Rect.prototype.top = function () {
            return new Point(this.height / 2 * Math.sin(this.theta) + this.x, -this.height / 2 * Math.cos(this.theta) + this.y);
        };

        Rect.prototype.bottom = function () {
            return new Point(this.height / 2 * Math.sin(this.theta) + this.x, this.height / 2 * Math.cos(this.theta) + this.y);
        };

        Rect.prototype.center = function () {
            return new Point(this.x, this.y);
        };

        Rect.left = function (x, y, width, height, theta) {
            if (typeof theta === "undefined") { theta = 0; }
            return new Point(-width / 2 * Math.cos(theta) + x, width / 2 * Math.sin(theta) + y);
        };

        Rect.right = function (x, y, width, height, theta) {
            if (typeof theta === "undefined") { theta = 0; }
            return new Point(width / 2 * Math.cos(theta) + x, width / 2 * Math.sin(theta) + y);
        };

        Rect.top = function (x, y, width, height, theta) {
            if (typeof theta === "undefined") { theta = 0; }
            return new Point(height / 2 * Math.sin(theta) + x, -height / 2 * Math.cos(theta) + y);
        };

        Rect.bottom = function (x, y, width, height, theta) {
            if (typeof theta === "undefined") { theta = 0; }
            return new Point(height / 2 * Math.sin(theta) + x, height / 2 * Math.cos(theta) + y);
        };

        Rect.center = function (x, y, width, height, theta) {
            if (typeof theta === "undefined") { theta = 0; }
            return new Point(x, y);
        };
        return Rect;
    })();
    Svg.Rect = Rect;

    var ViewBox = (function () {
        function ViewBox(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        ViewBox.prototype.toString = function () {
            return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height;
        };
        return ViewBox;
    })();
    Svg.ViewBox = ViewBox;
})(Svg || (Svg = {}));
/// <reference path="../dagre.d.ts"/>
/// <reference path="svg.ts"/>
var egrid;
(function (egrid) {
    /**
    @class egrid.Node
    */
    var Node = (function () {
        /**
        @class egrid.Node
        @constructor
        */
        function Node(text, weight, original, participants) {
            if (typeof weight === "undefined") { weight = undefined; }
            if (typeof original === "undefined") { original = undefined; }
            if (typeof participants === "undefined") { participants = undefined; }
            this.text = text;
            this.x = 0;
            this.y = 0;
            this.theta = 0;
            this.weight = weight || 1;
            this.key = Node.nextKey++;
            this.active = true;
            this.original = original || false;
            this.participants = participants || [];
        }
        Node.prototype.left = function () {
            return Svg.Rect.left(this.x, this.y, this.width, this.height);
        };

        Node.prototype.right = function () {
            return Svg.Rect.right(this.x, this.y, this.width, this.height);
        };

        Node.prototype.top = function () {
            return Svg.Rect.top(this.x, this.y, this.width, this.height);
        };

        Node.prototype.bottom = function () {
            return Svg.Rect.bottom(this.x, this.y, this.width, this.height);
        };

        Node.prototype.center = function () {
            return Svg.Rect.center(this.x, this.y, this.width, this.height);
        };

        Node.prototype.toString = function () {
            return this.key.toString();
        };
        Node.nextKey = 0;
        return Node;
    })();
    egrid.Node = Node;

    /**
    @class egrid.Link
    */
    var Link = (function () {
        /**
        @class egrid.Link
        @constructor
        */
        function Link(source, target, weight) {
            if (typeof weight === "undefined") { weight = undefined; }
            this.source = source;
            this.target = target;
            this.weight = weight || 1;
            this.key = Link.nextKey++;
        }
        Link.prototype.toString = function () {
            return this.key.toString();
        };
        Link.nextKey = 0;
        return Link;
    })();
    egrid.Link = Link;

    var CommandTransaction = (function () {
        function CommandTransaction() {
            this.commands = [];
        }
        CommandTransaction.prototype.execute = function () {
            this.commands.forEach(function (command) {
                command.execute();
            });
        };

        CommandTransaction.prototype.revert = function () {
            this.commands.reverse().forEach(function (command) {
                command.revert();
            });
            this.commands.reverse();
        };

        CommandTransaction.prototype.push = function (command) {
            this.commands.push(command);
        };
        return CommandTransaction;
    })();

    /**
    @class egrid.Grid
    */
    var Grid = (function () {
        /**
        @class egrid.Grid
        @constructor
        */
        function Grid() {
            this.nodes_ = [];
            this.links_ = [];
            this.undoStack = [];
            this.redoStack = [];
        }
        Grid.prototype.appendNode = function (node) {
            var _this = this;
            this.execute({
                execute: function () {
                    node.index = _this.nodes_.length;
                    _this.nodes_.push(node);
                    _this.updateConnections();
                },
                revert: function () {
                    node.index = undefined;
                    _this.nodes_.pop();
                    _this.updateConnections();
                }
            });
        };

        Grid.prototype.appendLink = function (sourceIndex, targetIndex) {
            var _this = this;
            var sourceNode = this.nodes_[sourceIndex];
            var targetNode = this.nodes_[targetIndex];
            var link = new Link(sourceNode, targetNode);
            this.execute({
                execute: function () {
                    _this.links_.push(link);
                    _this.updateLinkIndex();
                    _this.updateConnections();
                },
                revert: function () {
                    _this.links_.pop();
                    _this.updateLinkIndex();
                    _this.updateConnections();
                }
            });
            return link;
        };

        Grid.prototype.removeNode = function (removeNodeIndex) {
            var _this = this;
            var removeNode = this.nodes_[removeNodeIndex];
            var removedLinks;
            var previousLinks;
            this.execute({
                execute: function () {
                    _this.nodes_.splice(removeNodeIndex, 1);
                    previousLinks = _this.links_;
                    _this.links_ = _this.links_.filter(function (link) {
                        return link.source != removeNode && link.target != removeNode;
                    });
                    _this.updateNodeIndex();
                    _this.updateConnections();
                },
                revert: function () {
                    _this.nodes_.splice(removeNodeIndex, 0, removeNode);
                    _this.links_ = previousLinks;
                    _this.updateNodeIndex();
                    _this.updateConnections();
                }
            });
        };

        Grid.prototype.removeLink = function (removeLinkIndex) {
            var _this = this;
            var removeLink = this.links_[removeLinkIndex];
            this.execute({
                execute: function () {
                    _this.links_.splice(removeLinkIndex, 1);
                    _this.updateLinkIndex();
                    _this.updateConnections();
                },
                revert: function () {
                    _this.links_.splice(removeLinkIndex, 0, removeLink);
                    _this.updateLinkIndex();
                    _this.updateConnections();
                }
            });
        };

        Grid.prototype.updateNodeText = function (nodeIndex, newText) {
            var node = this.nodes_[nodeIndex];
            var oldText = node.text;
            this.execute({
                execute: function () {
                    node.text = newText;
                },
                revert: function () {
                    node.text = oldText;
                }
            });
        };

        Grid.prototype.updateLinkWeight = function (linkIndex, newWeight) {
            var link = this.links_[linkIndex];
            var oldWeight = link.weight;
            this.execute({
                execute: function () {
                    link.weight = newWeight;
                },
                revert: function () {
                    link.weight = oldWeight;
                }
            });
        };

        Grid.prototype.incrementLinkWeight = function (linkIndex) {
            this.updateLinkWeight(linkIndex, this.links_[linkIndex].weight + 1);
        };

        Grid.prototype.decrementLinkWeight = function (linkIndex) {
            this.updateLinkWeight(linkIndex, this.links_[linkIndex].weight - 1);
        };

        Grid.prototype.mergeNode = function (fromIndex, toIndex) {
            var _this = this;
            var fromNode = this.nodes_[fromIndex];
            var toNode = this.nodes_[toIndex];
            var newLinks = this.links_.filter(function (link) {
                return (link.source == fromNode && !_this.hasPath(toNode.index, link.target.index)) || (link.target == fromNode && !_this.hasPath(link.source.index, toNode.index));
            }).map(function (link) {
                if (link.source == fromNode) {
                    return new Link(toNode, link.target);
                } else {
                    return new Link(link.source, toNode);
                }
            });
            this.transactionWith(function () {
                _this.updateNodeText(toIndex, toNode.text + ", " + fromNode.text);
                _this.removeNode(fromIndex);
                _this.execute({
                    execute: function () {
                        newLinks.forEach(function (link) {
                            _this.links_.push(link);
                        });
                        _this.updateConnections();
                    },
                    revert: function () {
                        for (var i = 0; i < newLinks.length; ++i) {
                            _this.links_.pop();
                        }
                        _this.updateConnections();
                    }
                });
            });
        };

        Grid.prototype.radderUpAppend = function (fromIndex, newNode) {
            var _this = this;
            this.transactionWith(function () {
                _this.appendNode(newNode);
                _this.radderUp(fromIndex, newNode.index);
            });
        };

        Grid.prototype.radderUp = function (fromIndex, toIndex) {
            return this.appendLink(toIndex, fromIndex);
        };

        Grid.prototype.radderDownAppend = function (fromIndex, newNode) {
            var _this = this;
            this.transactionWith(function () {
                _this.appendNode(newNode);
                _this.radderDown(fromIndex, newNode.index);
            });
        };

        Grid.prototype.radderDown = function (fromIndex, toIndex) {
            return this.appendLink(fromIndex, toIndex);
        };

        Grid.prototype.canUndo = function () {
            return this.undoStack.length > 0;
        };

        Grid.prototype.undo = function () {
            var commands = this.undoStack.pop();
            commands.revert();
            this.redoStack.push(commands);
        };

        Grid.prototype.canRedo = function () {
            return this.redoStack.length > 0;
        };

        Grid.prototype.redo = function () {
            var commands = this.redoStack.pop();
            commands.execute();
            this.undoStack.push(commands);
        };

        Grid.prototype.toJSON = function () {
            return {
                nodes: this.nodes_.map(function (node) {
                    return {
                        text: node.text,
                        weight: node.weight,
                        original: node.original
                    };
                }),
                links: this.links_.map(function (link) {
                    return {
                        source: link.source.index,
                        target: link.target.index,
                        weight: link.weight
                    };
                })
            };
        };

        Grid.prototype.nodes = function (arg) {
            if (arg === undefined) {
                return this.nodes_;
            }
            this.nodes_ = arg;
            this.updateNodeIndex();
            this.updateConnections();
            return this;
        };

        Grid.prototype.findNode = function (text) {
            var result = null;
            this.nodes_.forEach(function (node) {
                if (node.text == text) {
                    result = node;
                }
            });
            return result;
        };

        Grid.prototype.links = function (arg) {
            if (arg === undefined) {
                return this.links_;
            }
            this.links_ = arg;
            this.updateLinkIndex();
            this.updateConnections();
            return this;
        };

        Grid.prototype.link = function (index1, index2) {
            if (typeof index2 === "undefined") { index2 = undefined; }
            if (index2 === undefined) {
                return this.links_[index1];
            } else {
                return this.links_.reduce(function (p, link) {
                    if (link.source.index == index1 && link.target.index == index2) {
                        return link;
                    } else {
                        return p;
                    }
                }, undefined);
            }
        };

        Grid.prototype.layout = function (checkActive) {
            if (typeof checkActive === "undefined") { checkActive = false; }
            var nodes = this.nodes_;
            var links = this.links_;
            if (checkActive) {
                nodes = nodes.filter(function (node) {
                    return node.active;
                });
                links = links.filter(function (link) {
                    return link.source.active && link.target.active;
                });
            }

            nodes.forEach(function (node) {
                var tmp = node.height;
                node.height = node.width;
                node.width = tmp;
            });

            dagre.layout().nodes(nodes).edges(links).rankSep(200).edgeSep(20).run();

            nodes.forEach(function (node) {
                node.x = node.dagre.y;
                node.y = node.dagre.x;
                node.width = node.dagre.height;
                node.height = node.dagre.width;
            });

            links.forEach(function (link) {
                link.dagre.points.forEach(function (point) {
                    var tmp = point.x;
                    point.x = point.y;
                    point.y = tmp;
                });
                link.previousPoints = link.points;
                link.points = link.dagre.points.map(function (p) {
                    return p;
                });
                link.points.unshift(link.source.right());
                link.points.push(link.target.left());
            });
        };

        Grid.prototype.hasPath = function (fromIndex, toIndex) {
            return this.pathMatrix[fromIndex][toIndex];
        };

        Grid.prototype.hasLink = function (fromIndex, toIndex) {
            return this.linkMatrix[fromIndex][toIndex];
        };

        Grid.prototype.numConnectedNodes = function (index, checkActive) {
            if (typeof checkActive === "undefined") { checkActive = false; }
            var _this = this;
            var result = 0;
            this.nodes_.forEach(function (node, j) {
                if (!checkActive || (checkActive && node.active)) {
                    if (_this.pathMatrix[index][j] || _this.pathMatrix[j][index]) {
                        result += 1;
                    }
                }
            });
            return result;
        };

        Grid.prototype.execute = function (command) {
            var _this = this;
            if (this.transaction) {
                command.execute();
                this.transaction.push(command);
            } else {
                this.transactionWith(function () {
                    _this.execute(command);
                });
            }
        };

        Grid.prototype.transactionWith = function (f) {
            this.beginTransaction();
            f();
            this.commitTransaction();
        };

        Grid.prototype.beginTransaction = function () {
            this.transaction = new CommandTransaction();
        };

        Grid.prototype.commitTransaction = function () {
            this.undoStack.push(this.transaction);
            this.redoStack = [];
            this.transaction = undefined;
        };

        Grid.prototype.rollbackTransaction = function () {
            this.transaction.revert();
            this.transaction = undefined;
        };

        Grid.prototype.updateConnections = function () {
            var _this = this;
            this.linkMatrix = this.nodes_.map(function (_) {
                return _this.nodes_.map(function (_) {
                    return false;
                });
            });
            this.links_.forEach(function (link) {
                _this.linkMatrix[link.source.index][link.target.index] = true;
            });
            this.nodes_.forEach(function (node) {
                node.isTop = node.isBottom = true;
            });
            this.pathMatrix = this.nodes_.map(function (fromNode, fromIndex) {
                return _this.nodes_.map(function (toNode, toIndex) {
                    var checkedFlags = _this.nodes_.map(function (_) {
                        return false;
                    });
                    var front = [fromIndex];
                    while (front.length > 0) {
                        var nodeIndex = front.pop();
                        if (nodeIndex == toIndex) {
                            if (nodeIndex != fromIndex) {
                                fromNode.isBottom = false;
                                toNode.isTop = false;
                            }
                            return true;
                        }
                        if (!checkedFlags[nodeIndex]) {
                            _this.nodes_.forEach(function (_, j) {
                                if (_this.linkMatrix[nodeIndex][j]) {
                                    front.push(j);
                                }
                            });
                        }
                    }
                    return false;
                });
            });
        };

        Grid.prototype.updateNodeIndex = function () {
            this.nodes_.forEach(function (node, i) {
                node.index = i;
            });
        };

        Grid.prototype.updateLinkIndex = function () {
            this.links_.forEach(function (link, i) {
                link.index = i;
            });
        };

        Grid.prototype.updateIndex = function () {
            this.updateNodeIndex();
            this.updateLinkIndex();
        };
        return Grid;
    })();
    egrid.Grid = Grid;
})(egrid || (egrid = {}));
/// <reference path="../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="grid.ts"/>
var egrid;
(function (egrid) {
    var DAG = (function () {
        /**
        * @class egrid.DAG
        * @constructor
        */
        function DAG() {
            this.grid_ = new egrid.Grid;
        }
        /**
        * @method grid
        * @return {egrid.Grid}
        */
        DAG.prototype.grid = function () {
            return this.grid_;
        };

        /**
        * @method nodes
        * @param {Egm.Node[]} [nodes] new nodes.
        * @return {egrid.DAG|egrid.Node[]} Returns self if nodes is specified. Otherwise, returns current nodes.
        */
        DAG.prototype.nodes = function (arg) {
            if (arg === undefined) {
                return this.grid_.nodes();
            }
            this.grid_.nodes(arg);
            return this;
        };

        /**
        * @method links
        * @param {Egm.Link[]} [links] new links.
        * @return {egrid.DAG|egrid.Link} Returns self if links is specified. Otherwise, returns current links.
        */
        DAG.prototype.links = function (arg) {
            if (arg === undefined) {
                return this.grid_.links();
            }
            this.grid_.links(arg);
            return this;
        };

        /**
        * @method notify
        */
        DAG.prototype.notify = function () {
            if (this.uiCallback) {
                this.uiCallback();
            }
            return this;
        };

        /**
        * @method registerUiCallback;
        */
        DAG.prototype.registerUiCallback = function (callback) {
            this.uiCallback = callback;
            return this;
        };

        /**
        * @method undo
        */
        DAG.prototype.undo = function () {
            if (this.grid().canUndo()) {
                this.grid().undo();
                this.draw();
                this.notify();
            }
            return this;
        };

        /**
        * @method redo
        */
        DAG.prototype.redo = function () {
            if (this.grid().canRedo()) {
                this.grid().redo();
                this.draw();
                this.notify();
            }
            return this;
        };

        /**
        * @method draw
        */
        DAG.prototype.draw = function () {
            return this;
        };

        /**
        * @method focusCenter
        */
        DAG.prototype.focusCenter = function () {
            return this;
        };

        /**
        * Generates a function to init display region.
        * @method display
        * @param regionWidth {number} Width of display region.
        * @param regionHeight {number} Height of display region.
        * @return {function}
        */
        DAG.prototype.display = function (regionWidth, regionHeight) {
            if (typeof regionWidth === "undefined") { regionWidth = undefined; }
            if (typeof regionHeight === "undefined") { regionHeight = undefined; }
            return function (selection) {
            };
        };
        return DAG;
    })();
    egrid.DAG = DAG;
})(egrid || (egrid = {}));
/// <reference path="../ts-definitions/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="svg.ts"/>
/// <reference path="dag.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egrid;
(function (egrid) {
    (function (ViewMode) {
        ViewMode[ViewMode["Normal"] = 0] = "Normal";
        ViewMode[ViewMode["Edge"] = 1] = "Edge";
    })(egrid.ViewMode || (egrid.ViewMode = {}));
    var ViewMode = egrid.ViewMode;

    (function (InactiveNode) {
        InactiveNode[InactiveNode["Hidden"] = 0] = "Hidden";
        InactiveNode[InactiveNode["Transparent"] = 1] = "Transparent";
    })(egrid.InactiveNode || (egrid.InactiveNode = {}));
    var InactiveNode = egrid.InactiveNode;

    var EgmOption = (function () {
        function EgmOption() {
        }
        EgmOption.default = function () {
            var option = new EgmOption;
            option.viewMode = 0 /* Normal */;
            option.inactiveNode = 1 /* Transparent */;
            option.scalingConnection = true;
            return option;
        };
        return EgmOption;
    })();
    egrid.EgmOption = EgmOption;

    (function (Raddering) {
        Raddering[Raddering["RadderUp"] = 0] = "RadderUp";
        Raddering[Raddering["RadderDown"] = 1] = "RadderDown";
    })(egrid.Raddering || (egrid.Raddering = {}));
    var Raddering = egrid.Raddering;

    /**
    * @class egrid.EGM
    */
    var EGM = (function (_super) {
        __extends(EGM, _super);
        /**
        * @class egrid.EGM
        * @constructor
        */
        function EGM() {
            _super.call(this);
            this.removeLinkButtonEnabled = false;
            this.options_ = EgmOption.default();
        }
        EGM.prototype.options = function (arg) {
            if (arg === undefined) {
                return this.options_;
            }
            this.options_ = arg;
            return this;
        };

        /**
        * @method draw
        */
        EGM.prototype.draw = function () {
            var _this = this;
            var spline = d3.svg.line().x(function (d) {
                return d.x;
            }).y(function (d) {
                return d.y;
            }).interpolate("basis");

            var nodes = this.nodes();
            var links = this.links();
            if (this.options_.inactiveNode == 0 /* Hidden */) {
                nodes = nodes.filter(function (d) {
                    return d.active;
                });
                links = links.filter(function (d) {
                    return d.source.active && d.target.active;
                });
            }

            var nodesSelection = this.contentsSelection.select(".nodes").selectAll(".element").data(nodes, Object);
            nodesSelection.exit().remove();
            nodesSelection.enter().append("g").call(this.appendElement());

            var nodeSizeScale = this.nodeSizeScale();
            nodesSelection.each(function (node) {
                var rect = _this.calcRect(node.text);
                var n = _this.grid().numConnectedNodes(node.index, true);
                node.baseWidth = rect.width;
                node.baseHeight = rect.height;
                node.width = node.baseWidth * nodeSizeScale(n);
                node.height = node.baseHeight * nodeSizeScale(n);
            });
            nodesSelection.selectAll("text").text(function (d) {
                return d.text;
            }).attr("x", function (d) {
                return EGM.rx - d.baseWidth / 2;
            }).attr("y", function (d) {
                return EGM.rx;
            });
            nodesSelection.selectAll("rect").attr("x", function (d) {
                return -d.baseWidth / 2;
            }).attr("y", function (d) {
                return -d.baseHeight / 2;
            }).attr("rx", function (d) {
                return (d.original || d.isTop || d.isBottom) ? 0 : EGM.rx;
            }).attr("width", function (d) {
                return d.baseWidth;
            }).attr("height", function (d) {
                return d.baseHeight;
            });

            var linksSelection = this.contentsSelection.select(".links").selectAll(".link").data(links, Object);
            linksSelection.exit().remove();
            linksSelection.enter().append("g").classed("link", true).each(function (link) {
                link.points = [link.source.right(), link.target.left()];
            }).call(function (selection) {
                selection.append("path");
                if (_this.removeLinkButtonEnabled) {
                    selection.call(_this.appendRemoveLinkButton());
                }
            });

            this.grid().layout(this.options_.inactiveNode == 0 /* Hidden */);

            this.rootSelection.selectAll(".contents .links .link path").filter(function (link) {
                return link.previousPoints.length != link.points.length;
            }).attr("d", function (link) {
                if (link.points.length > link.previousPoints.length) {
                    while (link.points.length != link.previousPoints.length) {
                        link.previousPoints.unshift(link.previousPoints[0]);
                    }
                } else {
                    link.previousPoints.splice(1, link.previousPoints.length - link.points.length);
                }
                return spline(link.previousPoints);
            });

            var linkWidthScale = this.linkWidthScale();
            var selectedNode = this.selectedNode();
            var transition = this.rootSelection.transition();
            transition.selectAll(".element").attr("opacity", function (node) {
                return node.active ? 1 : 0.3;
            }).attr("transform", function (node) {
                return (new Svg.Transform.Translate(node.center().x, node.center().y)).toString() + (new Svg.Transform.Rotate(node.theta / Math.PI * 180)).toString() + (new Svg.Transform.Scale(nodeSizeScale(_this.grid().numConnectedNodes(node.index, true)))).toString();
            });
            transition.selectAll(".link path").attr("d", function (link) {
                return spline(link.points);
            }).attr("opacity", function (link) {
                return link.source.active && link.target.active ? 1 : 0.3;
            }).attr("stroke-width", function (d) {
                return linkWidthScale(d.weight);
            });
            transition.selectAll(".link .removeLinkButton").attr("transform", function (link) {
                return "translate(" + link.points[1].x + "," + link.points[1].y + ")";
            }).attr("opacity", function (link) {
                return link.source == selectedNode || link.target == selectedNode ? 1 : 0;
            });
            transition.each("end", function () {
                _this.notify();
            });

            this.rescale();

            return this;
        };

        EGM.prototype.drawNodeConnection = function () {
            var _this = this;
            var d = this.selectedNode();
            this.rootSelection.selectAll(".connected").classed("connected", false);
            if (d) {
                d3.selectAll(".element").filter(function (d2) {
                    return _this.grid().hasPath(d.index, d2.index) || _this.grid().hasPath(d2.index, d.index);
                }).classed("connected", true);
                d3.selectAll(".link").filter(function (link) {
                    return (_this.grid().hasPath(d.index, link.source.index) && _this.grid().hasPath(d.index, link.target.index)) || (_this.grid().hasPath(link.source.index, d.index) && _this.grid().hasPath(link.target.index, d.index));
                }).classed("connected", true);
                d3.selectAll(".link .removeLinkButton").attr("opacity", function (link) {
                    return link.source == d || link.target == d ? 1 : 0;
                });
            }
        };

        EGM.prototype.getTextBBox = function (text) {
            return this.rootSelection.select(".measure").text(text).node().getBBox();
        };

        EGM.prototype.calcRect = function (text) {
            var bbox = this.getTextBBox(text);
            return new Svg.Rect(bbox.x, bbox.y, bbox.width + EGM.rx * 2, bbox.height + EGM.rx * 2);
        };

        EGM.prototype.appendElement = function () {
            var _this = this;
            return function (selection) {
                var egm = _this;
                var onElementClick = function () {
                    var selection = d3.select(this);
                    if (selection.classed("selected")) {
                        egm.unselectElement();
                        d3.event.stopPropagation();
                    } else {
                        egm.selectElement(selection);
                        d3.event.stopPropagation();
                    }
                    egm.notify();
                };
                selection.classed("element", true).on("click", onElementClick).on("touchstart", onElementClick);

                selection.append("rect");
                selection.append("text");
            };
        };

        EGM.prototype.appendRemoveLinkButton = function () {
            var _this = this;
            return function (selection) {
                selection.append("g").classed("removeLinkButton", true).attr("transform", function (link) {
                    return "translate(" + link.points[1].x + "," + link.points[1].y + ")";
                }).attr("opacity", 0).on("click", function (d) {
                    _this.grid().removeLink(d.index);
                    _this.draw();
                }).call(function (selection) {
                    selection.append("circle").attr("r", 16).attr("fill", "lightgray").attr("stroke", "none");
                    selection.append("image").attr("x", -8).attr("y", -8).attr("width", "16px").attr("height", "16px").attr("xlink:href", "images/glyphicons_207_remove_2.png");
                });
            };
        };

        EGM.prototype.nodeSizeScale = function () {
            var _this = this;
            return d3.scale.linear().domain(d3.extent(this.nodes(), function (node) {
                return _this.grid().numConnectedNodes(node.index, true);
            })).range([1, this.options_.scalingConnection ? 3 : 1]);
        };

        EGM.prototype.linkWidthScale = function () {
            return d3.scale.linear().domain(d3.extent(this.links(), function (link) {
                return link.weight;
            })).range([5, 15]);
        };

        EGM.prototype.rescale = function () {
            var filterdNodes = this.options_.inactiveNode == 0 /* Hidden */ ? this.nodes().filter(function (node) {
                return node.active;
            }) : this.nodes();
            var left = d3.min(filterdNodes, function (node) {
                return node.left().x;
            });
            var right = d3.max(filterdNodes, function (node) {
                return node.right().x;
            });
            var top = d3.min(filterdNodes, function (node) {
                return node.top().y;
            });
            var bottom = d3.max(filterdNodes, function (node) {
                return node.bottom().y;
            });

            var s = d3.min([
                1,
                0.9 * d3.min([
                    this.displayWidth / (right - left),
                    this.displayHeight / (bottom - top)]) || 1
            ]);
            this.contentsZoomBehavior.scaleExtent([s, 1]);
        };

        /**
        * Generates a function to init display region.
        * @method display
        * @param regionWidth {number} Width of display region.
        * @param regionHeight {number} Height of display region.
        * @return {function}
        */
        EGM.prototype.display = function (regionWidth, regionHeight) {
            if (typeof regionWidth === "undefined") { regionWidth = undefined; }
            if (typeof regionHeight === "undefined") { regionHeight = undefined; }
            var _this = this;
            return function (selection) {
                _this.rootSelection = selection;

                _this.displayWidth = regionWidth || $(window).width();
                _this.displayHeight = regionHeight || $(window).height();
                selection.attr("viewBox", (new Svg.ViewBox(0, 0, _this.displayWidth, _this.displayHeight)).toString());
                selection.append("text").classed("measure", true);

                selection.append("rect").attr("fill", "#fff").attr("width", _this.displayWidth).attr("height", _this.displayHeight);

                _this.contentsSelection = selection.append("g").classed("contents", true);
                _this.contentsSelection.append("g").classed("links", true);
                _this.contentsSelection.append("g").classed("nodes", true);

                _this.contentsZoomBehavior = d3.behavior.zoom().on("zoom", function () {
                    var translate = new Svg.Transform.Translate(d3.event.translate[0], d3.event.translate[1]);
                    var scale = new Svg.Transform.Scale(d3.event.scale);
                    _this.contentsSelection.attr("transform", translate.toString() + scale.toString());

                    _this.notify();
                });
                selection.call(_this.contentsZoomBehavior);
            };
        };

        EGM.prototype.createNode = function (text) {
            var node = new egrid.Node(text);
            return node;
        };

        /**
        * @method focusNode
        * @param node {egrid.Node}
        */
        EGM.prototype.focusNode = function (node) {
            var s = this.contentsZoomBehavior.scale() || 1;
            var translate = new Svg.Transform.Translate(this.displayWidth / 2 - node.center().x * s, this.displayHeight / 2 - node.center().y * s);
            var scale = new Svg.Transform.Scale(s);
            this.contentsZoomBehavior.translate([translate.x, translate.y]);
            this.contentsSelection.transition().attr("transform", translate.toString() + scale.toString());
        };

        /**
        * @method focusCenter
        */
        EGM.prototype.focusCenter = function () {
            var left = d3.min(this.nodes(), function (node) {
                return node.left().x;
            });
            var right = d3.max(this.nodes(), function (node) {
                return node.right().x;
            });
            var top = d3.min(this.nodes(), function (node) {
                return node.top().y;
            });
            var bottom = d3.max(this.nodes(), function (node) {
                return node.bottom().y;
            });

            var s = d3.min([
                1, 0.9 * d3.min([
                    this.displayWidth / (right - left),
                    this.displayHeight / (bottom - top)]) || 1]);
            var translate = new Svg.Transform.Translate((this.displayWidth - (right - left) * s) / 2, (this.displayHeight - (bottom - top) * s) / 2);
            var scale = new Svg.Transform.Scale(s);
            this.contentsZoomBehavior.translate([translate.x, translate.y]);
            this.contentsZoomBehavior.scale(scale.sx);
            this.contentsSelection.transition().attr("transform", translate.toString() + scale.toString());
            return this;
        };

        /**
        * @method selectElement
        * @param selection {D3.Selection}
        */
        EGM.prototype.selectElement = function (selection) {
            this.rootSelection.selectAll(".selected").classed("selected", false);
            selection.classed("selected", true);
            this.drawNodeConnection();
        };

        /**
        * @method selectedNode
        * @return {egrid.Node}
        */
        EGM.prototype.selectedNode = function () {
            var selection = this.rootSelection.select(".selected");
            return selection.empty() ? null : selection.datum();
        };

        /**
        * @method unselectElement
        */
        EGM.prototype.unselectElement = function () {
            this.rootSelection.selectAll(".selected").classed("selected", false);
            this.rootSelection.selectAll(".connected").classed("connected", false);
            this.rootSelection.selectAll(".link .removeLinkButton").attr("opacity", 0);
        };

        EGM.prototype.dragNode = function () {
            var egm = this;
            var isDroppable_;
            var dragToNode_;
            var dragToOther_;
            var f = function (selection) {
                var from;
                selection.call(d3.behavior.drag().on("dragstart", function () {
                    from = d3.select(".selected");
                    from.classed("dragSource", true);
                    var pos = [from.datum().center().x, from.datum().center().y];
                    egm.rootSelection.select(".contents").append("line").classed("dragLine", true).attr("x1", pos[0]).attr("y1", pos[1]).attr("x2", pos[0]).attr("y2", pos[1]);
                    d3.event.sourceEvent.stopPropagation();
                }).on("drag", function () {
                    var dragLineSelection = egm.rootSelection.select(".dragLine");
                    var x1 = Number(dragLineSelection.attr("x1"));
                    var y1 = Number(dragLineSelection.attr("y1"));
                    var p2 = egm.getPos(egm.rootSelection.select(".contents").node());
                    var x2 = p2.x;
                    var y2 = p2.y;
                    var theta = Math.atan2(y2 - y1, x2 - x1);
                    var r = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)) - 10;
                    dragLineSelection.attr("x2", x1 + r * Math.cos(theta)).attr("y2", y1 + r * Math.sin(theta));
                    var pos = egm.getPos(document.body);
                    var to = d3.select(document.elementFromPoint(pos.x, pos.y).parentNode);
                    var fromNode = from.datum();
                    var toNode = to.datum();
                    if (to.classed("element") && !to.classed("selected")) {
                        if (isDroppable_ && isDroppable_(fromNode, toNode)) {
                            to.classed("droppable", true);
                        } else {
                            to.classed("undroppable", true);
                        }
                    } else {
                        egm.rootSelection.selectAll(".droppable, .undroppable").classed("droppable", false).classed("undroppable", false);
                    }
                }).on("dragend", function () {
                    var pos = egm.getPos(document.body);
                    var to = d3.select(document.elementFromPoint(pos.x, pos.y).parentNode);
                    var fromNode = from.datum();
                    var toNode = to.datum();
                    if (toNode && fromNode != toNode) {
                        if (dragToNode_ && (!isDroppable_ || isDroppable_(fromNode, toNode))) {
                            dragToNode_(fromNode, toNode);
                        }
                    } else {
                        if (dragToOther_) {
                            dragToOther_(fromNode);
                        }
                    }
                    to.classed("droppable", false);
                    to.classed("undroppable", false);
                    from.classed("dragSource", false);
                    egm.rootSelection.selectAll(".dragLine").remove();
                }));
                return this;
            };
            f.isDroppable_ = function (from, to) {
                return true;
            };
            f.isDroppable = function (f) {
                isDroppable_ = f;
                return this;
            };
            f.dragToNode = function (f) {
                dragToNode_ = f;
                return this;
            };
            f.dragToOther = function (f) {
                dragToOther_ = f;
                return this;
            };
            return f;
        };

        EGM.prototype.raddering = function (selection, type) {
            var _this = this;
            var dragToNode = function (fromNode, toNode) {
                switch (type) {
                    case 0 /* RadderUp */:
                        if (_this.grid().hasLink(toNode.index, fromNode.index)) {
                            var link = _this.grid().link(toNode.index, fromNode.index);
                            _this.grid().incrementLinkWeight(link.index);
                            _this.draw();
                        } else {
                            _this.grid().radderUp(fromNode.index, toNode.index);
                            _this.draw();
                            _this.drawNodeConnection();
                            _this.focusNode(toNode);
                        }
                        break;
                    case 1 /* RadderDown */:
                        if (_this.grid().hasLink(fromNode.index, toNode.index)) {
                            var link = _this.grid().link(fromNode.index, toNode.index);
                            _this.grid().incrementLinkWeight(link.index);
                            _this.draw();
                        } else {
                            _this.grid().radderDown(fromNode.index, toNode.index);
                            _this.draw();
                            _this.drawNodeConnection();
                            _this.focusNode(toNode);
                        }
                        break;
                }
                _this.notify();
            };

            selection.call(this.dragNode().isDroppable(function (fromNode, toNode) {
                return !((type == 0 /* RadderUp */ && _this.grid().hasPath(fromNode.index, toNode.index)) || (type == 1 /* RadderDown */ && _this.grid().hasPath(toNode.index, fromNode.index)));
            }).dragToNode(dragToNode).dragToOther(function (fromNode) {
                var openPrompt;
                switch (type) {
                    case 0 /* RadderUp */:
                        openPrompt = _this.openLadderUpPrompt;
                        break;
                    case 1 /* RadderDown */:
                        openPrompt = _this.openLadderDownPrompt;
                        break;
                }

                openPrompt && openPrompt(function (text) {
                    if (text) {
                        var node;
                        if (node = _this.grid().findNode(text)) {
                            dragToNode(fromNode, node);
                        } else {
                            node = _this.createNode(text);
                            switch (type) {
                                case 0 /* RadderUp */:
                                    _this.grid().radderUpAppend(fromNode.index, node);
                                    break;
                                case 1 /* RadderDown */:
                                    _this.grid().radderDownAppend(fromNode.index, node);
                                    break;
                            }
                            _this.draw();
                            _this.drawNodeConnection();
                            _this.focusNode(node);
                            _this.notify();
                        }
                    }
                });
            }));
        };

        EGM.prototype.getPos = function (container) {
            var xy = d3.event.sourceEvent instanceof MouseEvent ? d3.mouse(container) : d3.touches(container, d3.event.sourceEvent.changedTouches)[0];
            return new Svg.Point(xy[0], xy[1]);
        };

        EGM.prototype.showRemoveLinkButton = function (arg) {
            if (arg === undefined) {
                return this.removeLinkButtonEnabled;
            }
            this.removeLinkButtonEnabled = arg;
            return this;
        };

        /**
        * @method appendNode
        * @return {egrid.EGM}
        */
        EGM.prototype.appendNode = function (text) {
            if (text) {
                var node;
                if (node = this.grid().findNode(text)) {
                    // node already exists
                } else {
                    // create new node
                    node = this.createNode(text);
                    node.original = true;
                    this.grid().appendNode(node);
                    this.draw();
                }
                var addedElement = this.contentsSelection.selectAll(".element").filter(function (node) {
                    return node.text == text;
                });
                this.selectElement(addedElement);
                this.focusNode(addedElement.datum());
                this.notify();
            }
            return this;
        };

        /**
        * @method removeSelectedNode
        * @return {egrid.EGM}
        */
        EGM.prototype.removeSelectedNode = function () {
            return this.removeNode(this.selectedNode());
        };

        /**
        * @method removeNode
        * @return {egrid.EGM}
        */
        EGM.prototype.removeNode = function (node) {
            if (node) {
                this.unselectElement();
                this.grid().removeNode(node.index);
                this.draw();
                this.notify();
            }
            return this;
        };

        /**
        * @method mergeNode
        * @return {egrid.EGM}
        */
        EGM.prototype.mergeNode = function (fromNode, toNode) {
            if (fromNode && toNode) {
                this.grid().mergeNode(fromNode.index, toNode.index);
                this.draw();
                this.unselectElement();
                this.focusNode(toNode);
                this.notify();
            }
            return this;
        };

        /**
        * @method editSelectedNode
        * @return {egrid.EGM}
        */
        EGM.prototype.editSelectedNode = function (text) {
            return this.editNode(this.selectedNode(), text);
        };

        /**
        * @method editNode
        * @return {egrid.EGM}
        */
        EGM.prototype.editNode = function (node, text) {
            if (node && text) {
                this.grid().updateNodeText(node.index, text);
                this.draw();
                this.notify();
            }
            return this;
        };
        EGM.rx = 20;
        return EGM;
    })(egrid.DAG);
    egrid.EGM = EGM;
})(egrid || (egrid = {}));
/// <reference path="../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="egm.ts"/>
var egrid;
(function (egrid) {
    /**
    * @class egrid.EGMUi
    */
    var EGMUi = (function () {
        /**
        * @class egrid.EGMUi
        * @constructor
        */
        function EGMUi() {
            var _this = this;
            this.egm_ = new egrid.EGM();
            this.egm_.registerUiCallback(function () {
                _this.updateNodeButtons();
                _this.updateUndoButton();
                _this.updateRedoButton();
            });
        }
        EGMUi.prototype.egm = function () {
            return this.egm_;
        };

        EGMUi.prototype.appendNodeButton = function () {
            var onClickPrompt;
            var f = function (selection) {
                var _this = this;
                selection.on("click", function () {
                    onClickPrompt && onClickPrompt(function (text) {
                        _this.egm().appendNode(text);
                    });
                });
                return this;
            };
            f.onClick = function (f) {
                onClickPrompt = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.removeNodeButton = function () {
            var egmui = this;
            var f = function (selection) {
                selection.on("click", function () {
                    egmui.egm().removeSelectedNode();
                });
                return this;
            };
            f.onEnable = function (f) {
                egmui.onEnableRemoveNodeButton = f;
                return this;
            };
            f.onDisable = function (f) {
                egmui.onDisableRemoveNodeButton = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.mergeNodeButton = function () {
            var egmui = this;
            var f = function (selection) {
                selection.call(egmui.egm().dragNode().isDroppable(function (fromNode, toNode) {
                    return !egmui.egm().grid().hasPath(toNode.index, fromNode.index);
                }).dragToNode(function (fromNode, toNode) {
                    egmui.egm().mergeNode(fromNode, toNode);
                }));
                return this;
            };
            f.onEnable = function (f) {
                egmui.onEnableMergeNodeButton = f;
                return this;
            };
            f.onDisable = function (f) {
                egmui.onDisableMergeNodeButton = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.editNodeButton = function () {
            var egmui = this;
            var onClickPrompt;
            var f = function (selection) {
                selection.on("click", function () {
                    onClickPrompt && onClickPrompt(function (text) {
                        egmui.egm().editSelectedNode(text);
                    });
                });
                return this;
            };
            f.onClick = function (f) {
                onClickPrompt = f;
                return this;
            };
            f.onEnable = function (f) {
                egmui.onEnableEditNodeButton = f;
                return this;
            };
            f.onDisable = function (f) {
                egmui.onDisableEditNodeButton = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.radderUpButton = function () {
            var egmui = this;
            var f = function (selection) {
                egmui.egm().raddering(selection, 0 /* RadderUp */);
            };
            f.onClick = function (f) {
                egmui.egm().openLadderUpPrompt = f;
                return this;
            };
            f.onEnable = function (f) {
                egmui.onEnableRadderUpButton = f;
                return this;
            };
            f.onDisable = function (f) {
                egmui.onDisableRadderUpButton = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.radderDownButton = function () {
            var egmui = this;
            var f = function (selection) {
                egmui.egm().raddering(selection, 1 /* RadderDown */);
                return this;
            };
            f.onClick = function (f) {
                egmui.egm().openLadderDownPrompt = f;
                return this;
            };
            f.onEnable = function (f) {
                egmui.onEnableRadderDownButton = f;
                return this;
            };
            f.onDisable = function (f) {
                egmui.onDisableRadderDownButton = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.saveButton = function () {
            var egmui = this;
            var f = function (selection) {
                selection.on("click", function () {
                    if (egmui.onClickSaveButton) {
                        egmui.onClickSaveButton(egmui.egm().grid().toJSON());
                    }
                });
                return this;
            };
            f.save = function (f) {
                egmui.onClickSaveButton = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.undoButton = function () {
            var egmui = this;
            var egm = this.egm();
            var f = function (selection) {
                selection.on("click", function () {
                    egm.undo();
                });
                return this;
            };
            f.onEnable = function (f) {
                egmui.onEnableUndoButton = f;
                return this;
            };
            f.onDisable = function (f) {
                egmui.onDisableUndoButton = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.redoButton = function () {
            var egmui = this;
            var egm = this.egm();
            var f = function (selection) {
                selection.on("click", function () {
                    egm.redo();
                });
                return this;
            };
            f.onEnable = function (f) {
                egmui.onEnableRedoButton = f;
                return this;
            };
            f.onDisable = function (f) {
                egmui.onDisableRedoButton = f;
                return this;
            };
            return f;
        };

        EGMUi.prototype.updateNodeButtons = function () {
            var egm = this.egm();
            var selectedNode = egm.selectedNode();
            if (selectedNode) {
                this.enableNodeButtons();
            } else {
                this.disableNodeButtons();
            }
        };

        EGMUi.prototype.enableNodeButtons = function () {
            var selection = d3.select(".selected");
            this.enableRemoveNodeButton(selection);
            this.enableMergeNodeButton(selection);
            this.enableEditNodeButton(selection);
            this.enableRadderUpButton(selection);
            this.enableRadderDownButton(selection);
        };

        EGMUi.prototype.disableNodeButtons = function () {
            this.disableRemoveNodeButton();
            this.disableMergeNodeButton();
            this.disableEditNodeButton();
            this.disableRadderUpButton();
            this.disableRadderDownButton();
        };

        EGMUi.prototype.enableRadderUpButton = function (selection) {
            if (this.onEnableRadderUpButton) {
                this.onEnableRadderUpButton(selection);
            }
        };

        EGMUi.prototype.disableRadderUpButton = function () {
            if (this.onDisableRadderUpButton) {
                this.onDisableRadderUpButton();
            }
        };

        EGMUi.prototype.enableRadderDownButton = function (selection) {
            if (this.onEnableRadderDownButton) {
                this.onEnableRadderDownButton(selection);
            }
        };

        EGMUi.prototype.disableRadderDownButton = function () {
            if (this.onDisableRadderDownButton) {
                this.onDisableRadderDownButton();
            }
        };

        EGMUi.prototype.enableRemoveNodeButton = function (selection) {
            if (this.onEnableRemoveNodeButton) {
                this.onEnableRemoveNodeButton(selection);
            }
        };

        EGMUi.prototype.disableRemoveNodeButton = function () {
            if (this.onDisableRemoveNodeButton) {
                this.onDisableRemoveNodeButton();
            }
        };

        EGMUi.prototype.enableMergeNodeButton = function (selection) {
            if (this.onEnableMergeNodeButton) {
                this.onEnableMergeNodeButton(selection);
            }
        };

        EGMUi.prototype.disableMergeNodeButton = function () {
            if (this.onDisableMergeNodeButton) {
                this.onDisableMergeNodeButton();
            }
        };

        EGMUi.prototype.enableEditNodeButton = function (selection) {
            if (this.onEnableEditNodeButton) {
                this.onEnableEditNodeButton(selection);
            }
        };

        EGMUi.prototype.disableEditNodeButton = function () {
            if (this.onDisableEditNodeButton) {
                this.onDisableEditNodeButton();
            }
        };

        EGMUi.prototype.enableUndoButton = function () {
            if (this.onEnableUndoButton) {
                this.onEnableUndoButton();
            }
        };

        EGMUi.prototype.disableUndoButton = function () {
            if (this.onDisableUndoButton) {
                this.onDisableUndoButton();
            }
        };

        EGMUi.prototype.enableRedoButton = function () {
            if (this.onEnableRedoButton) {
                this.onEnableRedoButton();
            }
        };

        EGMUi.prototype.disableRedoButton = function () {
            if (this.onDisableRedoButton) {
                this.onDisableRedoButton();
            }
        };

        EGMUi.prototype.updateUndoButton = function () {
            if (this.egm().grid().canUndo()) {
                this.enableUndoButton();
            } else {
                this.disableUndoButton();
            }
        };

        EGMUi.prototype.updateRedoButton = function () {
            if (this.egm().grid().canRedo()) {
                this.enableRedoButton();
            } else {
                this.disableRedoButton();
            }
        };
        return EGMUi;
    })();
    egrid.EGMUi = EGMUi;

    /**
    * @return {egrid.EGMUi}
    */
    function egmui() {
        return new EGMUi;
    }
    egrid.egmui = egmui;
})(egrid || (egrid = {}));
/// <reference path="../ts-definitions/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="dag.ts"/>
var egrid;
(function (egrid) {
    /**
    * @class egrid.SEM
    */
    var SEM = (function (_super) {
        __extends(SEM, _super);
        function SEM() {
            _super.apply(this, arguments);
            this.removeLinkButtonEnabled = true;
        }
        /**
        * @method draw
        * @return {egrid.SEM}
        */
        SEM.prototype.draw = function () {
            var _this = this;
            var spline = d3.svg.line().x(function (d) {
                return d.x;
            }).y(function (d) {
                return d.y;
            }).interpolate("basis");

            var nodes = this.activeNodes();
            var links = this.activeLinks();

            var nodesSelection = this.contentsSelection.select(".nodes").selectAll(".element").data(nodes, Object);
            nodesSelection.exit().remove();
            nodesSelection.enter().append("g").call(this.appendElement());

            var nodeSizeScale = this.nodeSizeScale();
            nodesSelection.each(function (node) {
                var rect = _this.calcRect(node.text);
                var n = _this.grid().numConnectedNodes(node.index, true);
                node.baseWidth = rect.width;
                node.baseHeight = rect.height;
                node.width = node.baseWidth * nodeSizeScale(n);
                node.height = node.baseHeight * nodeSizeScale(n);
            });
            nodesSelection.selectAll("text").text(function (d) {
                return d.text;
            }).attr("x", function (d) {
                return SEM.rx - d.baseWidth / 2;
            }).attr("y", function (d) {
                return SEM.rx;
            });
            nodesSelection.selectAll("rect").attr("x", function (d) {
                return -d.baseWidth / 2;
            }).attr("y", function (d) {
                return -d.baseHeight / 2;
            }).attr("rx", function (d) {
                return (d.original || d.isTop || d.isBottom) ? 0 : SEM.rx;
            }).attr("width", function (d) {
                return d.baseWidth;
            }).attr("height", function (d) {
                return d.baseHeight;
            });
            nodesSelection.selectAll(".removeNodeButton").attr("transform", function (d) {
                return "translate(" + (-d.baseWidth / 2) + "," + (-d.baseHeight / 2) + ")";
            });

            var linksSelection = this.contentsSelection.select(".links").selectAll(".link").data(links, Object);
            linksSelection.exit().remove();
            linksSelection.enter().append("g").classed("link", true).each(function (link) {
                link.points = [link.source.right(), link.target.left()];
            }).call(function (selection) {
                selection.append("path");
                if (_this.removeLinkButtonEnabled) {
                    selection.call(_this.appendRemoveLinkButton());
                }
                selection.append("text").style("font-size", "2em").attr("stroke", "gray").attr("fill", "gray").attr("x", 20).attr("y", 30);
            });

            this.grid().layout(true);

            this.rootSelection.selectAll(".contents .links .link path").filter(function (link) {
                return link.previousPoints.length != link.points.length;
            }).attr("d", function (link) {
                if (link.points.length > link.previousPoints.length) {
                    while (link.points.length != link.previousPoints.length) {
                        link.previousPoints.unshift(link.previousPoints[0]);
                    }
                } else {
                    link.previousPoints.splice(1, link.previousPoints.length - link.points.length);
                }
                return spline(link.previousPoints);
            });

            var linkWidthScale = this.linkWidthScale();
            var transition = this.rootSelection.transition();
            transition.selectAll(".element").attr("opacity", function (node) {
                return node.active ? 1 : 0.3;
            }).attr("transform", function (node) {
                return (new Svg.Transform.Translate(node.center().x, node.center().y)).toString() + (new Svg.Transform.Rotate(node.theta / Math.PI * 180)).toString() + (new Svg.Transform.Scale(nodeSizeScale(_this.grid().numConnectedNodes(node.index, true)))).toString();
            });
            transition.selectAll(".link path").attr("d", function (link) {
                return spline(link.points);
            }).attr("opacity", function (link) {
                return link.source.active && link.target.active ? 1 : 0.3;
            }).attr("stroke-width", function (d) {
                return linkWidthScale(Math.abs(d.coef));
            }).attr("stroke", function (d) {
                return d.coef >= 0 ? "blue" : "red";
            });
            var coefFormat = d3.format(".3f");
            transition.selectAll(".link text").attr("transform", function (link) {
                return "translate(" + link.points[1].x + "," + link.points[1].y + ")";
            }).text(function (d) {
                return coefFormat(d.coef);
            });
            transition.selectAll(".link .removeLinkButton").attr("transform", function (link) {
                return "translate(" + link.points[1].x + "," + link.points[1].y + ")";
            });
            transition.each("end", function () {
                //this.notify();
            });

            this.rescale();

            return this;
        };

        SEM.prototype.getTextBBox = function (text) {
            return this.rootSelection.select(".measure").text(text).node().getBBox();
        };

        SEM.prototype.calcRect = function (text) {
            var bbox = this.getTextBBox(text);
            return new Svg.Rect(bbox.x, bbox.y, bbox.width + SEM.rx * 2, bbox.height + SEM.rx * 2);
        };

        SEM.prototype.appendElement = function () {
            var _this = this;
            return function (selection) {
                selection.classed("element", true);
                selection.append("rect");
                selection.append("text");
                selection.append("g").classed("removeNodeButton", true).on("click", function (d) {
                    d.active = false;
                    _this.draw();
                    _this.notify();
                }).call(function (selection) {
                    selection.append("circle").attr("r", 16).attr("fill", "lightgray").attr("stroke", "none");
                    selection.append("image").attr("x", -8).attr("y", -8).attr("width", "16px").attr("height", "16px").attr("xlink:href", "images/glyphicons_207_remove_2.png");
                });
                selection.call(_this.dragNode().isDroppable(function (fromNode, toNode) {
                    return fromNode != toNode;
                }).dragToNode(function (fromNode, toNode) {
                    var link = _this.grid().radderUp(fromNode.index, toNode.index);
                    link.coef = 0;
                    _this.draw();
                    _this.notify();
                }));
            };
        };

        SEM.prototype.appendRemoveLinkButton = function () {
            var _this = this;
            return function (selection) {
                selection.append("g").classed("removeLinkButton", true).attr("transform", function (link) {
                    return "translate(" + link.points[1].x + "," + link.points[1].y + ")";
                }).on("click", function (d) {
                    _this.grid().removeLink(d.index);
                    _this.draw();
                    _this.notify();
                }).call(function (selection) {
                    selection.append("circle").attr("r", 16).attr("fill", "lightgray").attr("stroke", "none");
                    selection.append("image").attr("x", -8).attr("y", -8).attr("width", "16px").attr("height", "16px").attr("xlink:href", "images/glyphicons_207_remove_2.png");
                });
            };
        };

        SEM.prototype.nodeSizeScale = function () {
            var _this = this;
            return d3.scale.linear().domain(d3.extent(this.nodes(), function (node) {
                return _this.grid().numConnectedNodes(node.index, true);
            })).range([1, 1]);
        };

        SEM.prototype.linkWidthScale = function () {
            return d3.scale.linear().domain([
                0, d3.max(this.activeLinks(), function (link) {
                    return Math.abs(link.coef);
                })]).range([5, 15]);
        };

        SEM.prototype.rescale = function () {
            var filterdNodes = this.nodes().filter(function (node) {
                return node.active;
            });
            var left = d3.min(filterdNodes, function (node) {
                return node.left().x;
            });
            var right = d3.max(filterdNodes, function (node) {
                return node.right().x;
            });
            var top = d3.min(filterdNodes, function (node) {
                return node.top().y;
            });
            var bottom = d3.max(filterdNodes, function (node) {
                return node.bottom().y;
            });

            var s = d3.min([
                1,
                0.9 * d3.min([
                    this.displayWidth / (right - left),
                    this.displayHeight / (bottom - top)]) || 1
            ]);
            this.contentsZoomBehavior.scaleExtent([s, 1]);
        };

        /**
        * Generates a function to init display region.
        * @method display
        * @param regionWidth {number} Width of display region.
        * @param regionHeight {number} Height of display region.
        * @return {function}
        */
        SEM.prototype.display = function (regionWidth, regionHeight) {
            if (typeof regionWidth === "undefined") { regionWidth = undefined; }
            if (typeof regionHeight === "undefined") { regionHeight = undefined; }
            var _this = this;
            return function (selection) {
                _this.rootSelection = selection;

                _this.displayWidth = regionWidth || $(window).width();
                _this.displayHeight = regionHeight || $(window).height();
                selection.attr("viewBox", (new Svg.ViewBox(0, 0, _this.displayWidth, _this.displayHeight)).toString());
                selection.append("text").classed("measure", true);

                selection.append("rect").attr("fill", "#fff").attr("width", _this.displayWidth).attr("height", _this.displayHeight);

                _this.contentsSelection = selection.append("g").classed("contents", true);
                _this.contentsSelection.append("g").classed("links", true);
                _this.contentsSelection.append("g").classed("nodes", true);

                _this.contentsZoomBehavior = d3.behavior.zoom().on("zoom", function () {
                    var translate = new Svg.Transform.Translate(d3.event.translate[0], d3.event.translate[1]);
                    var scale = new Svg.Transform.Scale(d3.event.scale);
                    _this.contentsSelection.attr("transform", translate.toString() + scale.toString());
                    //this.notify();
                });
                selection.call(_this.contentsZoomBehavior);
            };
        };

        /**
        * @method focusCenter
        */
        SEM.prototype.focusCenter = function () {
            var left = d3.min(this.nodes(), function (node) {
                return node.left().x;
            });
            var right = d3.max(this.nodes(), function (node) {
                return node.right().x;
            });
            var top = d3.min(this.nodes(), function (node) {
                return node.top().y;
            });
            var bottom = d3.max(this.nodes(), function (node) {
                return node.bottom().y;
            });

            var s = d3.min([
                1, 0.9 * d3.min([
                    this.displayWidth / (right - left),
                    this.displayHeight / (bottom - top)]) || 1]);
            var translate = new Svg.Transform.Translate((this.displayWidth - (right - left) * s) / 2, (this.displayHeight - (bottom - top) * s) / 2);
            var scale = new Svg.Transform.Scale(s);
            this.contentsZoomBehavior.translate([translate.x, translate.y]);
            this.contentsZoomBehavior.scale(scale.sx);
            this.contentsSelection.transition().attr("transform", translate.toString() + scale.toString());
            return this;
        };

        SEM.prototype.activeNodes = function () {
            return this.nodes().filter(function (d) {
                return d.active;
            });
        };

        SEM.prototype.activeLinks = function () {
            return this.links().filter(function (d) {
                return d.source.active && d.target.active;
            });
        };

        SEM.prototype.dragNode = function () {
            var egm = this;
            var isDroppable_;
            var dragToNode_;
            var dragToOther_;
            var f = function (selection) {
                var from;
                selection.call(d3.behavior.drag().on("dragstart", function () {
                    from = d3.select(document.elementFromPoint(d3.event.sourceEvent.x, d3.event.sourceEvent.y));
                    from.classed("dragSource", true);
                    var pos = [from.datum().center().x, from.datum().center().y];
                    egm.rootSelection.select(".contents").append("line").classed("dragLine", true).attr("x1", pos[0]).attr("y1", pos[1]).attr("x2", pos[0]).attr("y2", pos[1]);
                    d3.event.sourceEvent.stopPropagation();
                }).on("drag", function () {
                    var dragLineSelection = egm.rootSelection.select(".dragLine");
                    var x1 = Number(dragLineSelection.attr("x1"));
                    var y1 = Number(dragLineSelection.attr("y1"));
                    var p2 = egm.getPos(egm.rootSelection.select(".contents").node());
                    var x2 = p2.x;
                    var y2 = p2.y;
                    var theta = Math.atan2(y2 - y1, x2 - x1);
                    var r = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)) - 10;
                    dragLineSelection.attr("x2", x1 + r * Math.cos(theta)).attr("y2", y1 + r * Math.sin(theta));
                    var to = d3.select(document.elementFromPoint(d3.event.sourceEvent.x, d3.event.sourceEvent.y).parentNode);
                    var fromNode = from.datum();
                    var toNode = to.datum();
                    if (to.classed("element") && !to.classed("selected")) {
                        if (isDroppable_ && isDroppable_(fromNode, toNode)) {
                            to.classed("droppable", true);
                        } else {
                            to.classed("undroppable", true);
                        }
                    } else {
                        egm.rootSelection.selectAll(".droppable, .undroppable").classed("droppable", false).classed("undroppable", false);
                    }
                }).on("dragend", function () {
                    var to = d3.select(document.elementFromPoint(d3.event.sourceEvent.x, d3.event.sourceEvent.y).parentNode);
                    var fromNode = from.datum();
                    var toNode = to.datum();
                    if (toNode && fromNode != toNode) {
                        if (dragToNode_ && (!isDroppable_ || isDroppable_(fromNode, toNode))) {
                            dragToNode_(fromNode, toNode);
                        }
                    } else {
                        if (dragToOther_) {
                            dragToOther_(fromNode);
                        }
                    }
                    to.classed("droppable", false);
                    to.classed("undroppable", false);
                    from.classed("dragSource", false);
                    egm.rootSelection.selectAll(".dragLine").remove();
                }));
                return this;
            };
            f.isDroppable_ = function (from, to) {
                return true;
            };
            f.isDroppable = function (f) {
                isDroppable_ = f;
                return this;
            };
            f.dragToNode = function (f) {
                dragToNode_ = f;
                return this;
            };
            f.dragToOther = function (f) {
                dragToOther_ = f;
                return this;
            };
            return f;
        };

        SEM.prototype.getPos = function (container) {
            var xy = d3.event.sourceEvent instanceof MouseEvent ? d3.mouse(container) : d3.touches(container, d3.event.sourceEvent.changedTouches)[0];
            return new Svg.Point(xy[0], xy[1]);
        };
        SEM.rx = 20;
        return SEM;
    })(egrid.DAG);
    egrid.SEM = SEM;

    /**
    * @return {egrid.SEM}
    */
    function sem() {
        return new SEM;
    }
    egrid.sem = sem;
})(egrid || (egrid = {}));
/// <reference path="../../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="../../egrid/egm.ts"/>
/// <reference path="../../egrid/egm-ui.ts"/>
var Controllers;
(function (Controllers) {
    function EgmEditController($scope, $routeParams, $http, $location, $dialog) {
        var projectId = $scope.projectId = $routeParams.projectId;
        var participantId = $scope.participantId = $routeParams.participantId;
        var jsonUrl = "/api/participants/" + projectId + "/" + participantId + "/grid";
        var overallJsonUrl = "/api/projects/" + projectId + "/grid";
        var overallTexts = [];

        var egmui = egrid.egmui();
        var egm = egmui.egm();
        egm.showRemoveLinkButton(true);
        egm.options().scalingConnection = false;
        d3.select("#display").call(egm.display());

        $scope.call = function (callback) {
            callback();
        };

        function callWithProxy(f) {
            $scope.callback = f;
            $("#ngClickProxy").trigger("click");
        }

        function openInputTextDialog(callback) {
            callWithProxy(function () {
                var textsDict = {};
                var texts = overallTexts.map(function (d) {
                    var obj = {
                        text: d.text,
                        weight: d.weight
                    };
                    d.participants.forEach(function (p) {
                        if (p == participantId) {
                            obj.weight -= 1;
                        }
                    });
                    textsDict[d.text] = obj;
                    return obj;
                });
                egm.nodes().forEach(function (node) {
                    if (textsDict[node.text]) {
                        textsDict[node.text].weight += 1;
                    } else {
                        texts.push({
                            text: node.text,
                            weight: 1
                        });
                    }
                });
                var d = $dialog.dialog({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    templateUrl: '/partials/input-text-dialog.html',
                    controller: InputTextDialogController,
                    resolve: { texts: function () {
                            return texts;
                        } }
                });
                d.open().then(function (result) {
                    callback(result);
                });
            });
        }

        d3.select("#appendNodeButton").call(egmui.appendNodeButton().onClick(openInputTextDialog));
        d3.select("#undoButton").call(egmui.undoButton().onEnable(function () {
            d3.select("#undoButtonContainer").classed("disabled", false);
        }).onDisable(function () {
            d3.select("#undoButtonContainer").classed("disabled", true);
        }));
        d3.select("#redoButton").call(egmui.redoButton().onEnable(function () {
            d3.select("#redoButtonContainer").classed("disabled", false);
        }).onDisable(function () {
            d3.select("#redoButtonContainer").classed("disabled", true);
        }));
        d3.select("#saveButton").call(egmui.saveButton().save(function (json) {
            $http({
                method: 'PUT',
                url: jsonUrl,
                data: json
            }).success(function (data) {
                var path = "/participants/" + projectId + "/" + participantId;
                $location.path(path);
            });
        }));

        function showNodeController(selection) {
            if (!selection.empty()) {
                var nodeRect = selection.node().getBoundingClientRect();
                var controllerWidth = $("#nodeController").width();
                d3.select("#nodeController").classed("invisible", false).style("top", nodeRect.top + nodeRect.height + 10 + "px").style("left", nodeRect.left + (nodeRect.width - controllerWidth) / 2 + "px");
            }
        }

        function hideNodeController() {
            d3.select("#nodeController").classed("invisible", true);
        }

        function moveNodeController(selection) {
            var nodeRect = selection.node().getBoundingClientRect();
            var controllerWidth = $("#nodeController").width();
            d3.select("#nodeController").style("top", nodeRect.top + nodeRect.height + 10 + "px").style("left", nodeRect.left + (nodeRect.width - controllerWidth) / 2 + "px");
        }

        d3.select("#ladderUpButton").call(egmui.radderUpButton().onClick(openInputTextDialog).onEnable(showNodeController).onDisable(hideNodeController));
        d3.select("#ladderDownButton").call(egmui.radderDownButton().onClick(openInputTextDialog).onEnable(showNodeController).onDisable(hideNodeController));
        d3.select("#removeNodeButton").call(egmui.removeNodeButton().onEnable(showNodeController).onDisable(hideNodeController));
        d3.select("#mergeNodeButton").call(egmui.mergeNodeButton().onEnable(showNodeController).onDisable(hideNodeController));
        d3.select("#editNodeButton").call(egmui.editNodeButton().onClick(openInputTextDialog).onEnable(showNodeController).onDisable(hideNodeController));

        $http.get(jsonUrl).success(function (data) {
            var nodes = data.nodes.map(function (d) {
                return new egrid.Node(d.text, d.weight, d.original);
            });
            var links = data.links.map(function (d) {
                return new egrid.Link(nodes[d.source], nodes[d.target], d.weight);
            });
            egm.nodes(nodes).links(links).draw().focusCenter();
        });

        $http.get(overallJsonUrl).success(function (data) {
            overallTexts = data.nodes;
        });
    }
    Controllers.EgmEditController = EgmEditController;

    function InputTextDialogController($scope, dialog, texts) {
        texts.sort(function (t1, t2) {
            return t2.weight - t1.weight;
        });
        $scope.result = "";
        $scope.texts = texts;
        $scope.close = function (result) {
            dialog.close(result);
        };
    }
})(Controllers || (Controllers = {}));
/// <reference path="../../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="../../egrid/egm.ts"/>
var Controllers;
(function (Controllers) {
    function EgmShowController($scope, $routeParams, $http, $location) {
        var projectId = $scope.projectId = $routeParams.projectId;
        var participantId = $scope.participantId = $routeParams.participantId;
        var jsonUrl = "/api/participants/" + projectId + "/" + participantId + "/grid";

        var egm = new egrid.EGM;
        d3.select("#display").call(egm.display());

        $http.get(jsonUrl).success(function (data) {
            var nodes = data.nodes.map(function (d) {
                return new egrid.Node(d.text, d.weight, d.original);
            });
            var links = data.links.map(function (d) {
                return new egrid.Link(nodes[d.source], nodes[d.target], d.weight);
            });
            egm.nodes(nodes).links(links).draw().focusCenter();
        });
    }
    Controllers.EgmShowController = EgmShowController;
})(Controllers || (Controllers = {}));
/// <reference path="../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts"/>
/// <reference path="../../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="../../egrid/egm.ts"/>
/// <reference path="../../egrid/egm-ui.ts"/>
var Controllers;
(function (Controllers) {
    function EgmShowAllController($scope, $routeParams, $http, $location, $dialog) {
        var data;
        var participants;
        var projectId = $scope.projectId = $routeParams.projectId;
        var participantsUrl = "/api/participants/" + projectId;
        var jsonUrl = "/api/projects/" + projectId + "/grid";
        var filter = {};

        $scope.call = function (callback) {
            callback();
        };

        function callWithProxy(f) {
            $scope.callback = f;
            $("#ngClickProxy").trigger("click");
        }

        var egmui = egrid.egmui();
        var egm = egmui.egm();
        d3.select("#display").call(egm.display());

        function showNodeController(selection) {
            if (!selection.empty()) {
                var nodeRect = selection.node().getBoundingClientRect();
                var controllerWidth = $("#nodeController").width();
                d3.select("#nodeController").classed("invisible", false).style("top", nodeRect.top + nodeRect.height + 10 + "px").style("left", nodeRect.left + (nodeRect.width - controllerWidth) / 2 + "px");
            }
        }

        function hideNodeController() {
            d3.select("#nodeController").classed("invisible", true);
        }

        d3.select("#removeNodeButton").call(egmui.removeNodeButton().onEnable(showNodeController).onDisable(hideNodeController));
        d3.select("#mergeNodeButton").call(egmui.mergeNodeButton().onEnable(showNodeController).onDisable(hideNodeController));

        d3.select("#filterButton").on("click", function () {
            callWithProxy(function () {
                var node = egm.selectedNode();
                participants.forEach(function (participant) {
                    if (node) {
                        participant.active = node.participants.indexOf(participant.key) >= 0;
                    } else {
                        participant.active = false;
                    }
                });
                var d = $dialog.dialog({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    templateUrl: '/partials/filter-participants-dialog.html',
                    controller: FilterParticipantsDialogController,
                    resolve: {
                        participants: function () {
                            return participants;
                        },
                        filter: function () {
                            return filter;
                        }
                    }
                });
                d.open().then(function (result) {
                    egm.nodes().forEach(function (d) {
                        d.active = d.participants.some(function (key) {
                            return result[key];
                        });
                    });
                    egm.draw().focusCenter();
                });
            });
        });

        d3.select("#layoutButton").on("click", function () {
            callWithProxy(function () {
                var d = $dialog.dialog({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    templateUrl: '/partials/setting-dialog.html',
                    controller: SettingDialogController,
                    resolve: { options: function () {
                            return egm.options();
                        } }
                });
                d.open().then(function () {
                    egm.draw();
                });
            });
        });

        d3.select("#undoButton").call(egmui.undoButton().onEnable(function () {
            d3.select("#undoButtonContainer").classed("disabled", false);
        }).onDisable(function () {
            d3.select("#undoButtonContainer").classed("disabled", true);
        }));
        d3.select("#redoButton").call(egmui.redoButton().onEnable(function () {
            d3.select("#redoButtonContainer").classed("disabled", false);
        }).onDisable(function () {
            d3.select("#redoButtonContainer").classed("disabled", true);
        }));

        $http.get(jsonUrl).success(function (data_) {
            data = data_;
            var nodes = data.nodes.map(function (d) {
                return new egrid.Node(d.text, d.weight, d.original, d.participants);
            });
            var links = data.links.map(function (d) {
                return new egrid.Link(nodes[d.source], nodes[d.target], d.weight);
            });
            egm.nodes(nodes).links(links).draw().focusCenter();
        });

        $http.get(participantsUrl).success(function (participants_) {
            participants = participants_;
            participants.forEach(function (participant) {
                participant.active = false;
                filter[participant.key] = true;
            });
        });
    }
    Controllers.EgmShowAllController = EgmShowAllController;

    function FilterParticipantsDialogController($scope, dialog, participants, filter) {
        $scope.results = filter;
        $scope.participants = participants;
        $scope.close = function () {
            dialog.close($scope.results);
        };
    }

    function SettingDialogController($scope, dialog, options) {
        $scope.options = options;
        $scope.ViewMode = egrid.ViewMode;
        $scope.InactiveNode = egrid.InactiveNode;
        $scope.close = function () {
            dialog.close();
        };
    }
})(Controllers || (Controllers = {}));
/// <reference path="../../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="../../egrid/egm.ts"/>
var Controllers;
(function (Controllers) {
    function ParticipantDetailController($scope, $routeParams, $http) {
        var projectId = $scope.projectId = $routeParams.projectId;
        var participantId = $scope.participantId = $routeParams.participantId;
        var jsonUrl = "/api/participants/" + projectId + "/" + participantId + "/grid";

        $http.get("/api/participants/" + projectId + "/" + participantId).success(function (data) {
            $scope.participant = data;
        });

        var gridTabInitialized = false;
        $scope.gridTabSelected = function () {
            if (!gridTabInitialized) {
                var width = 960 / 12 * 10;
                var height = 500;
                var egm = new egrid.EGM;

                d3.select("#display").attr("width", width).attr("height", height).style("display", "block").style("border", "solid").call(egm.display(width, height));

                $http.get(jsonUrl).success(function (data) {
                    var nodes = data.nodes.map(function (d) {
                        return new egrid.Node(d.text, d.weight, d.original);
                    });
                    var links = data.links.map(function (d) {
                        return new egrid.Link(nodes[d.source], nodes[d.target], d.weight);
                    });
                    egm.nodes(nodes).links(links).draw().focusCenter();
                });
                gridTabInitialized = true;
            }
        };
    }
    Controllers.ParticipantDetailController = ParticipantDetailController;
})(Controllers || (Controllers = {}));
/// <reference path="../ts-definitions/DefinitelyTyped/jquery/jquery.d.ts"/>
var egrid;
(function (egrid) {
    (function (api) {
        /**
        * @class Project
        */
        var Project = (function () {
            function Project(obj, key) {
                if (obj) {
                    this.name = obj.name;
                    this.note = obj.note;
                }
                if (key) {
                    this.key_ = key;
                }
            }
            Project.prototype.key = function () {
                return this.key_;
            };

            Project.prototype.save = function () {
                var _this = this;
                if (this.key()) {
                    // TODO update
                } else {
                    return $.ajax({
                        url: Project.url(),
                        type: 'POST',
                        data: {
                            name: this.name,
                            note: this.note
                        },
                        dataFilter: function (data) {
                            var obj = JSON.parse(data);
                            _this.key_ = obj.key;
                            return _this;
                        }
                    });
                }
            };

            Project.prototype.url = function () {
                return Project.url(this.key());
            };

            Project.get = function (key) {
                if (key) {
                    return $.ajax({
                        url: Project.url(key),
                        type: 'GET',
                        dataFilter: function (data) {
                            var obj = JSON.parse(data);
                            return new Project(obj, obj.key);
                        }
                    });
                } else {
                    return $.ajax({
                        url: Project.url(),
                        type: 'GET',
                        dataFilter: function (data) {
                            var objs = JSON.parse(data);
                            return objs.map(function (obj) {
                                return new Project(obj, obj.key);
                            });
                        }
                    });
                }
            };

            Project.url = function (key) {
                if (key) {
                    return '/api/projects/' + key;
                } else {
                    return '/api/projects';
                }
            };
            return Project;
        })();
        api.Project = Project;
    })(egrid.api || (egrid.api = {}));
    var api = egrid.api;
})(egrid || (egrid = {}));
/// <reference path="../ts-definitions/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="project.ts"/>
var egrid;
(function (egrid) {
    (function (api) {
        var Participant = (function () {
            function Participant(obj, key) {
                if (obj) {
                    this.name = obj.name;
                    this.note = obj.note;
                }
                if (key) {
                    this.key_ = key;
                }
            }
            Participant.prototype.key = function () {
                return this.key_;
            };

            Participant.get = function (projectKey, key) {
                if (key) {
                } else {
                    return $.ajax({
                        url: Participant.url(projectKey),
                        type: 'GET',
                        dataFilter: function (data) {
                            var objs = JSON.parse(data);
                            return objs.map(function (obj) {
                                return new Participant(obj, obj.key);
                            });
                        }
                    });
                }
            };

            Participant.url = function (projectKey, key) {
                if (key) {
                    return egrid.api.Project.url(projectKey) + '/participants/' + key;
                } else {
                    return egrid.api.Project.url(projectKey) + '/participants';
                }
            };
            return Participant;
        })();
        api.Participant = Participant;
    })(egrid.api || (egrid.api = {}));
    var api = egrid.api;
})(egrid || (egrid = {}));
/// <reference path="../../api/project.ts"/>
/// <reference path="../../api/participant.ts"/>
var Controllers;
(function (Controllers) {
    function ProjectDetailController($scope, $routeParams, $http, $location) {
        var projectId = $routeParams.projectId;
        $scope.projectId = projectId;
        egrid.api.Project.get(projectId).done(function (data) {
            $scope.project = data;
            $scope.$apply();
        });
        egrid.api.Participant.get(projectId).done(function (data) {
            $scope.participants = data;
            $scope.$apply();
        });
        $http.get("/api/collaborators/" + projectId).success(function (data) {
            $scope.collaborators = data;
        });

        $scope.newParticipant = {};
        $scope.createParticipant = function () {
            $http({
                method: 'PUT',
                url: '/api/participants/' + projectId,
                data: $scope.newParticipant
            }).success(function (data) {
                var path = "/participants/" + projectId + "/" + data.key;
                $location.path(path);
            });
        };

        $scope.newCollaborator = {};
        $scope.createCollaborator = function () {
            $http({
                method: 'PUT',
                url: '/api/collaborators/' + projectId,
                data: $scope.newCollaborator
            }).success(function (data) {
                $scope.collaborators.push(data);
                $scope.newCollaborator = {};
            });
        };
    }
    Controllers.ProjectDetailController = ProjectDetailController;

    function ProjectDetailSemProjectListController($scope, $http) {
        var projectId = $scope.$parent.projectId;

        $http.get("/api/projects/" + projectId + "/sem-projects").success(function (data) {
            $scope.semProjects = data;
        });
    }
    Controllers.ProjectDetailSemProjectListController = ProjectDetailSemProjectListController;

    function ProjectDetailSemProjectCreateController($scope, $http, $location) {
        var projectId = $scope.$parent.projectId;

        $scope.createSemProject = function () {
            //$http({
            //  method: "PUT",
            //  url: "/api/
            //})
        };
    }
    Controllers.ProjectDetailSemProjectCreateController = ProjectDetailSemProjectCreateController;
})(Controllers || (Controllers = {}));
/// <reference path="../../api/project.ts"/>
var Controllers;
(function (Controllers) {
    function projectUrl(project) {
        return '/projects/' + project.key();
    }
    Controllers.projectUrl = projectUrl;
})(Controllers || (Controllers = {}));
/// <reference path="../../api/project.ts"/>
/// <reference path="url.ts"/>
var Controllers;
(function (Controllers) {
    function ProjectListController($scope, $location) {
        egrid.api.Project.get().done(function (data) {
            $scope.projects = data;
            $scope.$apply();
        });

        $scope.newProject = new egrid.api.Project;

        $scope.createProject = function () {
            $scope.newProject.save().done(function () {
                $location.path(Controllers.projectUrl($scope.newProject));
                $scope.$apply();
            });
        };
    }
    Controllers.ProjectListController = ProjectListController;
})(Controllers || (Controllers = {}));
/// <reference path="../../ts-definitions/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="../../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="../../sem.d.ts"/>
/// <reference path="../../egrid/egm.ts"/>
/// <reference path="../../egrid/sem.ts"/>
var Controllers;
(function (Controllers) {
    function SemProjectDetailController($scope, $routeParams, $http, $location) {
        $scope.projectId = $routeParams.projectId;
    }
    Controllers.SemProjectDetailController = SemProjectDetailController;

    function SemProjectDetailDesignController($scope, $http) {
        var projectId = $scope.$parent.projectId;
        var overallEgm = new egrid.EGM;
        var egm = new egrid.EGM;

        $scope.semProject = {
            name: '書きやすさの分析',
            project: {
                key: projectId,
                name: 'シャープペンシル'
            }
        };

        $scope.items = [];

        $scope.fullscreen = function () {
        };

        $scope.checked = function (item) {
            return item.checked;
        };

        $scope.updateGraph = function () {
            var itemDict = {};
            $scope.items.forEach(function (item) {
                itemDict[item.text] = item.checked;
            });
            var nodes = [];
            var links = [];
            overallEgm.nodes().forEach(function (node) {
                if (itemDict[node.text]) {
                    var newNode = new egrid.Node(node.text);
                    newNode.index = node.index;
                    nodes.push(newNode);
                }
            });
            nodes.forEach(function (node1) {
                nodes.forEach(function (node2) {
                    if (node1.index != node2.index && overallEgm.grid().hasPath(node1.index, node2.index)) {
                        links.push(new egrid.Link(node1, node2));
                    }
                });
            });
            egm.nodes(nodes).links(links).draw().focusCenter();
        };

        $http.get("/api/projects/" + projectId + "/grid").success(function (data) {
            data.nodes.forEach(function (node) {
                $scope.items.push({
                    text: node.text,
                    weight: node.weight,
                    checked: false
                });
                $scope.items.sort(function (item1, item2) {
                    return item2.weight - item1.weight;
                });
            });

            var width = $("#sem-questionnaire-deisgn-display").width();
            var height = $("#sem-questionnaire-deisgn-display").height();
            d3.select("#sem-questionnaire-design-display svg").call(egm.display(width, height));

            var nodes = data.nodes.map(function (d) {
                return new egrid.Node(d.text, d.weight, d.original);
            });
            var links = data.links.map(function (d) {
                return new egrid.Link(nodes[d.source], nodes[d.target], d.weight);
            });
            overallEgm.nodes(nodes).links(links);
        });
    }
    Controllers.SemProjectDetailDesignController = SemProjectDetailDesignController;

    function SemProjectDetailAnalysisController($scope, $http) {
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
        ];
        var S = [
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
        ];
        var SDict = {};
        nodes.forEach(function (node) {
            SDict[node] = {};
        });
        nodes.forEach(function (node1, i) {
            nodes.forEach(function (node2, j) {
                SDict[node1][node2] = S[i][j];
            });
        });

        var egmNodes = nodes.map(function (d) {
            return new egrid.Node(d);
        });
        var egmLinks = links.map(function (d) {
            return new egrid.Link(egmNodes[d.target], egmNodes[d.source]);
        });

        var dag = egrid.sem();

        function calcPath() {
            var nodes = dag.activeNodes();
            var links = dag.activeLinks();
            var nodesDict = {};
            nodes.forEach(function (node, i) {
                nodesDict[node.text] = i;
            });
            var n = nodes.length;
            var alpha = links.map(function (link) {
                return [nodesDict[link.target.text], nodesDict[link.source.text]];
            });
            var sigma = nodes.map(function (_, i) {
                return [i, i];
            });
            var S = nodes.map(function (node1) {
                return nodes.map(function (node2) {
                    return SDict[node1.text][node2.text];
                });
            });
            sem(n, alpha, sigma, S, (function (result) {
                var A = nodes.map(function (_) {
                    return nodes.map(function (_) {
                        return 0;
                    });
                });
                result.alpha.forEach(function (r) {
                    A[r[0]][r[1]] = r[2];
                });
                links.forEach(function (link) {
                    link.coef = A[nodesDict[link.target.text]][nodesDict[link.source.text]];
                });
                dag.draw();
            }));
        }

        dag.nodes(egmNodes).links(egmLinks).registerUiCallback(function () {
            $scope.$apply();
            calcPath();
        });

        var n = nodes.length;
        var alpha = links.map(function (d) {
            return [d.target, d.source];
        });
        var sigma = nodes.map(function (_, i) {
            return [i, i];
        });
        sem(n, alpha, sigma, S, (function (result) {
            var A = dag.nodes().map(function (_) {
                return dag.nodes().map(function (_) {
                    return 0;
                });
            });
            result.alpha.forEach(function (r) {
                A[r[0]][r[1]] = r[2];
            });
            dag.links().forEach(function (link) {
                link.coef = A[link.source.index][link.target.index];
            });
        }));

        $scope.$parent.drawSemAnalysis = function () {
            var width = $("#sem-analysis-display").width();
            var height = $("#sem-analysis-display").height();
            d3.select("#sem-analysis-display svg").call(dag.display(width, height));

            dag.draw().focusCenter();
        };

        $scope.items = dag.nodes();

        $scope.removeNode = function () {
            dag.draw();
            calcPath();
        };
    }
    Controllers.SemProjectDetailAnalysisController = SemProjectDetailAnalysisController;
})(Controllers || (Controllers = {}));
/// <reference path="../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts"/>
/// <reference path="../ts-definitions/DefinitelyTyped/d3/d3.d.ts"/>
/// <reference path="../egrid/egm.ts"/>
/// <reference path="controllers/egm_edit.ts"/>
/// <reference path="controllers/egm_show.ts"/>
/// <reference path="controllers/egm_show_all.ts"/>
/// <reference path="controllers/participant_detail.ts"/>
/// <reference path="controllers/project_detail.ts"/>
/// <reference path="controllers/project_list.ts"/>
/// <reference path="controllers/sem_project_detail.ts"/>
angular.module('collaboegm', ["ui.bootstrap", "pascalprecht.translate"]).directive("egmApplicationView", function () {
    return {
        restrict: "EA",
        transclude: true,
        templateUrl: "/partials/base.html"
    };
}).directive('focusMe', function () {
    var params = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        params[_i] = arguments[_i + 0];
    }
    var $timeout = params[0];
    return {
        link: function (scope, element, attrs, model) {
            $timeout(function () {
                element[0].focus();
            });
        }
    };
}).config([
    '$routeProvider', function ($routeProvider) {
        $routeProvider.when("/projects", {
            templateUrl: "/partials/project-list.html",
            controller: Controllers.ProjectListController
        }).when("/projects/:projectId/grid", {
            templateUrl: "/partials/egm-show-all.html",
            controller: Controllers.EgmShowAllController
        }).when("/projects/:projectId", {
            templateUrl: "/partials/project-detail.html",
            controller: Controllers.ProjectDetailController
        }).when("/participants/:projectId/:participantId/grid", {
            templateUrl: "/partials/egm-show.html",
            controller: Controllers.EgmShowController
        }).when("/participants/:projectId/:participantId/edit", {
            templateUrl: "/partials/egm-edit.html",
            controller: Controllers.EgmEditController
        }).when("/participants/:projectId/:participantId", {
            templateUrl: "/partials/participant-detail.html",
            controller: Controllers.ParticipantDetailController
        }).when("/sem-projects/:projectId/:semProjectId", {
            templateUrl: "/partials/sem-project-detail.html",
            controller: Controllers.SemProjectDetailController
        }).when("/help", {
            templateUrl: "/partials/help.html"
        }).when("/about", {
            templateUrl: "/partials/about.html"
        }).otherwise({
            redirectTo: "/projects"
        });
    }]).config([
    "$translateProvider", function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'locations/',
            suffix: '.json'
        }).fallbackLanguage("en").preferredLanguage("ja");
    }]).run([
    '$rootScope', '$translate', '$http', function ($rootScope, $translate, $http) {
        $rootScope.changeLanguage = function (langKey) {
            $translate.uses(langKey);
            $http({
                method: "POST",
                url: '/api/users',
                data: {
                    location: langKey
                }
            });
        };

        $http.get("/api/users").success(function (user) {
            $rootScope.user = user;
            $translate.uses(user.location);
        });

        var dest_url = "/";
        $http.get("/api/users/logout?dest_url=" + encodeURIComponent(dest_url)).success(function (data) {
            $rootScope.logoutUrl = data.logout_url;
        });
    }]);
