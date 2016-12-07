import {ObservedVariable} from '../../domain/variable'
import {VariableVM} from './variable-vm'

export class ObservedVariableVM extends VariableVM {

  values: any[]

  constructor(v: ObservedVariable) {
    super(v.id, v.key)
    this.values = v.values
  }

}
