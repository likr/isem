import {uuidGen} from '../../utils/uuid-gen'
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

  readonly list: ObservedVariable[]

  constructor(data: any[][]) {
    this.list = rotate(data).map((v) => {
      const key = v[0]
      v.shift()
      return {
        id: uuidGen(),
        key,
        values: v.filter((vv) => !!vv)
      }
    })
  }

  map<T>(cb: (value: ObservedVariable, index: number, array: ObservedVariable[]) => T) {
    return this.list.map<T>(cb)
  }

}
