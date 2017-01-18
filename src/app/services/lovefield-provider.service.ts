import {Injectable} from '@angular/core'
import * as lf from 'lovefield'

@Injectable()
export class LovefieldProviderService {

  get(): typeof lf {
    return lf
  }

}
