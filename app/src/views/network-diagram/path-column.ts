'use strict';
import typeVertex = require('../../scripts/modules/vertex');

import injector = require('../../scripts/injector');
var angular = injector.angular();
var app     = injector.app();
var constants = injector.constants();
var localized = injector.localized();
var log       = injector.log();


var directiveName = 'isemNetworkDiagramPathColumn';

interface Scope extends ng.IScope {
  dialog: any;
  variableArray(): Array<typeVertex.Props>;
  edgeArray(): [number, number][];
  managedEdgeList(): any;
  vertexId: number;

  localized: any;
  locale(): string;
}

export class Controller{
  /**
   * @constructor
   * @ngInject
   */
  constructor(
      private $rootScope: ng.IRootScopeService,
      private $scope: Scope
  ) {
    // DO NOT call #init() here because $scope hasn't been set yet.
  }

  init() {
    log.trace(log.t(), __filename, '#init()', this.$scope);
    console.log(this.$rootScope)
    //this.$scope.edgeArray     = ["dafda","astyrew"];
    this.$scope.managedEdgeList = this.edgeList();

    console.log(this.$scope)
  }

  getLabel(i:any):String{
    var labels: any = {};
    var variableArray = this.$scope.variableArray();
    console.log(variableArray,i);
    if(variableArray ){
      variableArray.forEach((v: any) => {
        labels[v.vertexId] = v.label;
      });
      return labels[i]
    }
  }
  edgeList() : any{
    console.log("hoge",this.$scope);
    var labels: any = {};
    var variableArray = this.$scope.variableArray();
    variableArray.forEach((v: any) => {
      labels[v.vertexId] = v.label;
    });
    return this.$scope.edgeArray().map((edge: [number,number])=>{
      return {
        uLabel:   labels[edge[0]],
        u:        edge[0],
        vLabel:   labels[edge[1]],
        v:        edge[1],
        selected: false
      };
    });

    return ["hoge","piyo"]
  }

  remove(edge:any):any{
    var removeTarget = [
      {
        uLabel:   this.getLabel(edge[0]),
        u:        edge[0],
        vLabel:   this.getLabel(edge[0]),
        v:        edge[1],
        selected: true
      }
    ]
    this.$rootScope.$broadcast(constants.REMOVE_RELATION, removeTarget);
  }

  debug() {
    console.log("love");
  }

}



class Definition {
  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'A',
      scope: {
        variableArray: '&isemIoVariableArray',
        edgeArray    : '&isemIoEdgeArray'
        //edgeList: function(variableArray: any,edgeArray: any): any{
        //  console.log(variableArray,edgeArray);
        //  return [];
        //}
      },
      templateUrl: app.viewsDir.networkDiagram + 'path-column.html',
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
