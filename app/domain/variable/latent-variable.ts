import {uuidGen} from '../../utils'

export class LatentVariable {

  id: string
  key: string

  constructor(key: string) {
    this.id  = uuidGen()
    this.key = key
  }

}
