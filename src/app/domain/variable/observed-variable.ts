import {Variable} from './variable'

export class ObservedVariable extends Variable {

  observedVariableToken: 'ObservedVariable'
  values: number[]

  /**
   * @param key
   * @param values as stringed number[] - ex) ["1.23", "45"]
   */
  constructor(key: string, values: string[]) {
    super(key)
    this.observedVariableToken = 'ObservedVariable'

    this.values = values
      .filter((v) => !!v)
      .map((v) => Number(v))
  }

}
