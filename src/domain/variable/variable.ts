import {uuidGen} from '../../utils/uuid-gen'

export class Variable {

  id: string
  key: string

  constructor(key: string) {
    this.id  = uuidGen()
    this.key = key
  }

}
