import {Injectable} from '@angular/core'
import * as lf from 'lovefield'

import {LovefieldProvider} from './lovefield.provider'
import {DatabaseAdapter} from './database.adapter';

const PROJECT = 'Project'

interface ProjectTable extends lf.schema.Table {
  uuid:     lf.PredicateProvider
  created:  lf.PredicateProvider
  modified: lf.PredicateProvider
  models:   lf.PredicateProvider
  name:     lf.PredicateProvider
  data:     lf.PredicateProvider
}

const projectSchema = (db: lf.Database): ProjectTable => {
  return db.getSchema().table(PROJECT) as ProjectTable
}

@Injectable()
export class ProjectsDatabaseAdapter {

  private lf: typeof lf

  constructor(private db: DatabaseAdapter,
              lovefieldProvider: LovefieldProvider) {
    this.lf = lovefieldProvider.get()
    this.initSchema()
  }

  addRow<T>(item: T): Promise<Object[]> {
    return this.db.connection.then((db) => {
      const row = projectSchema(db)
        .createRow(item)
      return db.insertOrReplace()
        .into(projectSchema(db))
        .values([row])
        .exec()
    })
  }

  deleteRow(primaryKey: string): Promise<Object[]> {
    return this.db.connection.then((db) => {
      return db.delete()
        .from(projectSchema(db))
        .where(projectSchema(db).uuid.eq(primaryKey))
        .exec()
    })
  }

  getAll(): Promise<Object[]> {
    return this.db.connection.then((db) => {
      return db.select()
        .from(projectSchema(db))
        .exec()
    })
  }

  private initSchema() {
    this.db.builder.createTable(PROJECT).
      addColumn('uuid',     this.lf.Type.STRING).
      addColumn('created',  this.lf.Type.NUMBER).
      addColumn('modified', this.lf.Type.NUMBER).
      addColumn('models',   this.lf.Type.OBJECT).
      addColumn('name',     this.lf.Type.STRING).
      addColumn('data',     this.lf.Type.OBJECT).
      addPrimaryKey(['uuid'])
  }

}
