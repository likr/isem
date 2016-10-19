import {uuidGen} from '../../utils/uuid-gen'

export class LatentVariable {

  id: string
  key: string

  constructor(key: string) {
    this.id  = uuidGen()
    this.key = key
  }

}
