import {LatentVariable} from '../../domain/variable/latent-variable'
import {VariableVm} from './variable-vm'

export class LatentVariableVm extends VariableVm {

  constructor(v: LatentVariable) {
    super(v.id, v.key)
  }

}
