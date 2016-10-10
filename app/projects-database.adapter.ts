import {Injectable} from '@angular/core'
import * as lf from 'lovefield'

import {LovefieldProvider} from './lovefield.provider'
import {DatabaseAdapter} from './database.adapter';

const PROJECT = 'Project'

const projectSchema = (db: lf.Database) => db.getSchema().table(PROJECT)

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
