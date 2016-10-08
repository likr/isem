import {uuidGen} from '../utils/uuid-gen'

export class Project {

  uuid: string
  created: number
  modified: number
  models: Object

  constructor(public name: string,
              public data: any) {
    this.uuid = uuidGen()

    const now = Date.now() / 1000 |0
    this.created  = now
    this.modified = now

    this.models = {}
  }

}