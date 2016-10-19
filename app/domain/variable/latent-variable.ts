import {uuidGen} from '../../utils/uuid-gen'

export class LatentVariable {

  uuid: string

  constructor(public key: string) {
    this.uuid = uuidGen()
  }

}
