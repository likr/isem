import {ObservedVariable} from './observed-variable'

/**
 * # example
 *
 * [
 *   [1,2,3],
 *   [4,5,6]
 * ]
 *
 * to be
 *
 * [
 *   [1,4],
 *   [2,5],
 *   [3,6]
 * ]
 */
const rotate = (array: any[][]): any[][] => {
  return array[0].map((_, i) => {
    return array.map((vv, ii) => vv[i])
  })
}

export class  ObservedVariables {

  private list: ObservedVariable[]

  static fromBackend(v: ObservedVariables): ObservedVariables {
    const o = new ObservedVariables([])
    o.list = v.list || [] as ObservedVariable[]
    return o
  }

  static fromData(data: any[][]): ObservedVariables {
    const o = new ObservedVariables([])
    o.list = rotate(data).map((v) => {
      const key = v[0]
      v.shift()
      return new ObservedVariable(key, v)
    })
    return o
  }

  constructor(observedVariables: ObservedVariable[]) {
    this.list = observedVariables
  }

  map<T>(cb: (value: ObservedVariable, index: number, array: ObservedVariable[]) => T): T[] {
    return this.list.map<T>(cb)
  }

  findById(id: string): ObservedVariable {
    return this.list.find((v) => v.id === id)
  }

  getFromSpecificIds(ids: string[]): ObservedVariables {
    return new ObservedVariables(ids.map((id) => this.findById(id)))
  }

  get allKeys(): string[] {
    return this.list.map((v) => v.key)
  }

}
