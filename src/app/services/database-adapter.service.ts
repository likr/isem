import {Injectable} from '@angular/core'
import * as lf from 'lovefield'

import {APP_NAME} from '../constant';
import {LovefieldProviderService} from './lovefield-provider.service'

@Injectable()
export class DatabaseAdapterService {

  private lf: typeof lf
  private _builder: lf.schema.Builder
  private _connection: Promise<lf.Database>

  constructor(provider: LovefieldProviderService) {
    this.lf = provider.get()
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
