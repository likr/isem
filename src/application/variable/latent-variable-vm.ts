import {LatentVariable} from '../../domain/variable'
import {VariableVM} from './variable-vm'

export class LatentVariableVM extends VariableVM {

  constructor(v: LatentVariable) {
    super(v.id, v.key)
  }

}
