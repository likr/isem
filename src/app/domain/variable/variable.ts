import {uuidGen} from '../../utils/uuid-gen'

export class Variable {

  id: string
  key: string

  static fromBackend(v: Variable): Variable {
    const variable = new Variable(v.key)
    variable.id    = v.id
    return variable
  }

  constructor(key: string) {
    this.id  = uuidGen()
    this.key = key
  }

}
