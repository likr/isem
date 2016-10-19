import {LatentVariable} from '../../domain/variable'

export class LatentVariableVM {

  id: string
  key: string

  constructor(v: LatentVariable) {
    this.id  = v.id
    this.key = v.key
  }

}
