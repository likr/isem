import {Variable} from './variable'

export class LatentVariable extends Variable {

  latentVariableToken: 'LatentVariable'

  static fromBackend(v: LatentVariable): LatentVariable {
    const variable = new LatentVariable(v.key)
    variable.id    = v.id
    return variable
  }

  constructor(key: string) {
    super(key)
    this.latentVariableToken = 'LatentVariable'
  }

}
