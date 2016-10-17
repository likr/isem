import {uuidGen} from '../../utils/uuid-gen'
import {ObservedVariables} from '../variable/observed-variables'

export class Project {

  readonly uuid: string
  readonly created: number
  readonly modified: number
  readonly models: Object
  readonly observedVariables: ObservedVariables

  constructor(public readonly name: string,
              rawData: any[][]) {
    this.uuid = uuidGen()

    const now = Date.now() / 1000 | 0
    this.created  = now
    this.modified = now

    this.models            = {}
    this.observedVariables = new ObservedVariables(rawData)
  }

}
