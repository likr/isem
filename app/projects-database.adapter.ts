import {Injectable} from '@angular/core'
import * as lf from 'lovefield'

import {LovefieldProvider} from './lovefield.provider'
import {DatabaseAdapter} from './database.adapter';

const PROJECT = 'Project'

@Injectable()
export class ProjectsDatabaseAdapter {

  private lf: typeof lf

  constructor(private db: DatabaseAdapter,
              lovefieldProvider: LovefieldProvider) {
    this.lf = lovefieldProvider.get()
    this.initSchema()
  }

  initSchema() {
    this.db.builder.createTable(PROJECT).
      addColumn('uuid',     this.lf.Type.STRING).
      addColumn('created',  this.lf.Type.NUMBER).
      addColumn('modified', this.lf.Type.NUMBER).
      addColumn('models',   this.lf.Type.OBJECT).
      addColumn('name',     this.lf.Type.STRING).
      addColumn('data',     this.lf.Type.OBJECT).
      addPrimaryKey(['uuid'])
  }

  addRow<T>(item: T): Promise<Array<Object>> {
    return this.db.builder.connect({}).then((db) => {
      const project = db.getSchema().table(PROJECT)
      const row     = project.createRow(item)
      return db.insertOrReplace().into(project).values([row]).exec()
    }).catch((err) => {
      return err
    })
  }

  getAll() {
    return this.db.builder.connect({}).then((db) => {
      const project = db.getSchema().table(PROJECT)
      return db.select().from(project).exec()
    })
  }

}
