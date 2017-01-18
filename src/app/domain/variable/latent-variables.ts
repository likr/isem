import {LatentVariable} from './latent-variable'
import {Variables} from './variables'

export class LatentVariables extends Variables<LatentVariable> {

  static fromBackend(v: LatentVariables): LatentVariables {
    const l = new LatentVariables()
    l.list = v.list || [] as LatentVariable[]
    return l
  }

  constructor() {
    super([])
  }

  add(newVariable: LatentVariable) {
    this.list.push(newVariable)
  }

  removeById(id: string) {
    this.list = this.list.filter((v) => v.id !== id)
  }

}
