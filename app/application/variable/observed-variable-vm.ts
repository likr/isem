import {ObservedVariable} from '../../domain/variable/observed-variable'

export class ObservedVariableVM {

  readonly id: string
  readonly key: string
  readonly values: any[]

  constructor(v: ObservedVariable) {
    this.id     = v.id
    this.key    = v.key
    this.values = v.values
  }

}
