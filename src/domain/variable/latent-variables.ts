import {LatentVariable} from './latent-variable'

export class LatentVariables {

  private list: LatentVariable[]

  static fromBackend(v: LatentVariables): LatentVariables {
    const l = new LatentVariables()
    l.list = v.list || [] as LatentVariable[]
    return l
  }

  constructor() {
    this.list = []
  }

  add(newVariable: LatentVariable): void {
    this.list.push(newVariable)
  }

  map<T>(cb: (value: LatentVariable, index: number, array: LatentVariable[]) => T) {
    return this.list.map<T>(cb)
  }

  findById(id: string): LatentVariable {
    return this.list.find((v) => v.id === id)
  }

  removeById(id: string) {
    this.list = this.list.filter((v) => v.id !== id)
  }

  get allKeys(): string[] {
    return this.list.map((v) => v.key)
  }

}
