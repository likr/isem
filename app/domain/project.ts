import {uuidGen} from '../utils/uuid-gen'

export type Data = {
  key: string
  values: any[]
}[]

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

export class Project {

  uuid: string
  created: number
  modified: number
  models: Object
  data: Data

  constructor(public name: string,
              _data: any[][]) {
    this.uuid = uuidGen()

    const now = Date.now() / 1000 | 0
    this.created  = now
    this.modified = now

    this.models = {}

    this.data = rotate(_data).map((v) => {
      const key = v[0]
      v.shift()
      return {key, id: uuidGen(), values: v.filter((vv) => !!vv)}
    })
  }

}
