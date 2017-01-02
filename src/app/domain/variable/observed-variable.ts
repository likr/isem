import {Variable} from './variable'

export class ObservedVariable extends Variable {

  values: any[]

  constructor(key: string, values: any[]) {
    super(key)
    this.values = values.filter((v) => !!v)
  }

}
