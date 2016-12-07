import {Injectable} from '@angular/core'
import * as lf from 'lovefield'

@Injectable()
export class LovefieldProvider {

  get(): typeof lf {
    return lf
  }

}
