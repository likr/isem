import {Injectable} from '@angular/core'
import * as lf from 'lovefield'

import {APP_NAME} from './constant';
import {LovefieldProvider} from './lovefield.provider'

@Injectable()
export class DatabaseAdapter {

  private lf: typeof lf
  private _builder: lf.schema.Builder
  private _connection: Promise<lf.Database>

  constructor(lovefieldProvider: LovefieldProvider) {
    this.lf = lovefieldProvider.get()
    this.initDatabase()
  }

  private initDatabase() {
    this._builder = this.lf.schema.create(APP_NAME, 1)
  }

  get builder(): lf.schema.Builder {
    return this._builder
  }

  get connection(): Promise<lf.Database> {
    if (!this._connection) {
      this._connection = this._builder.connect({})
    }
    return this._connection
  }

}
