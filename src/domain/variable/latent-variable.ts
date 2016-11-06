import {Variable} from './variable'

export class LatentVariable extends Variable {

  latentVariableToken: 'LatentVariable'

  constructor(key: string) {
    super(key)
    this.latentVariableToken = 'LatentVariable'
  }

}
