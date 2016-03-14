'use strict';
import injector = require('../scripts/injector');
var angular = injector.angular();
var app     = injector.app();
var storage = injector.Storage();

var ImportFile        = injector.ImportFile();

var directiveName = 'isemScreenProjectNavi';

interface Scope extends ng.IScope {
  localized: any;
}


class Controller {

  public items: any;


  constructor(
      private $rootScope: ng.IRootScopeService,
      private $scope: Scope
  ) {
    this.items = [];
    storage.list().then((res: any)=>{
      this.$scope.$apply(()=>{
        this.items = res.data;
      })
    })
  }

    /**
   * @returns {void}
   */
  openImportFile() {
    ImportFile.open();
  }

  open(id:string) {
    location.href=`/#/project/${id}`
  }

  remove(id:string){
    if(confirm("are you sure?")){
      storage.remove(id).then(function(){
        location.reload();
      })
    }
  }
}


export class Definition {
  static ddo() {
    return {
      controller: Controller,
      controllerAs: 'Controller',
      restrict: 'E',
      scope: {
        locale: '&isemIoLocale'
      },
      templateUrl: app.viewsDir.screens + 'screen-project-navi.html'
    };
  }
}

angular.module(app.appName).directive(directiveName, Definition.ddo);
