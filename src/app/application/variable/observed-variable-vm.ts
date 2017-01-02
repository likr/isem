import {ObservedVariable} from '../../domain/variable/observed-variable'
import {VariableVm} from './variable-vm'

export class ObservedVariableVm extends VariableVm {

  values: any[]

  constructor(v: ObservedVariable) {
    super(v.id, v.key)
    this.values = v.values
  }

}
