'use strict';

export interface API {
  save(name:string ,values: any,lines:any):any;
  list(): any;
  get(id: string): any;
  remove(id: string): any;
  update(id:string ,store: any ) : any;
  reset(id:string , cb: any) :any;
}

class Storage implements API{

  protected project:any;
  /**
   * @constructor
   */
  constructor() {
    var Kinto = require('kinto');
    var db = new Kinto();
    this.project = db.collection("projects");
  }

  /**
   * @returns {void}
   */
  protected init() {
  }


  public get(id: string){
    return this.project.get(id)
  }

  public remove(id: string){
    return this.project.delete(id)
  }

  public list(){
    return this.project.list({order: "-updated_at"});
  }

  public save(name:string ,values:any ,lines:any ){
    var date = new Date();
    var saveData = {
      name: name,
      origin: values,
      values: values,
      lines: lines,
      created_at: date,
      updated_at: date
    };
    var res = this.project.create(saveData);
    return res;
  }

  public update(id:string ,store: any){
    this.get(id).then((item: any)=>{
      var saveData: any = {
        id: item.data.id,
        name: item.data.name,
        origin: item.data.origin,
        values: store.variableArray,
        lines: store.edgeArray,
        created_at: item.data.created_at,
        updated_at: new Date()
      };
      this.project.update(saveData);
    })
  }

  public reset(id:string,cb : any){
    this.get(id).then((item: any)=>{
      var saveData: any = {
        id: item.data.id,
        name: item.data.name,
        origin: item.data.origin,
        values: null,
        lines: null,
        created_at: item.data.created_at,
        updated_at: new Date()
      };
      this.project.update(saveData);
      cb();
    })
  }
}

export var storage = new Storage();
