import {ObservedVariable} from './observed-variable'
import {Variables} from './variables'

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

export class ObservedVariables extends Variables<ObservedVariable> {

  static fromBackend(v: ObservedVariables): ObservedVariables {
    const o = new ObservedVariables([])
    o.list = v.list || [] as ObservedVariable[]
    return o
  }

  static fromData(data: string[][]): ObservedVariables {
    const o = new ObservedVariables([])
    o.list = rotate(data).map((v) => {
      const key = v[0].trim()
      v.shift()
      return new ObservedVariable(key, v)
    })
    return o
  }

  constructor(observedVariables: ObservedVariable[]) {
    super(observedVariables)
  }

  /**
   * @override
   */
  getFromSpecificIds(ids: string[]): ObservedVariables {
    return new ObservedVariables(ids.map((id) => this.findById(id)))
  }

}
