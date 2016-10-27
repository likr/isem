import {ObservedVariables} from '../variable/observed-variables'
import {LatentVariable, ObservedVariable} from '../variable'
import {uuidGen, unixtime} from '../../utils'

export class Project {

  name:              string
  uuid:              string
  created:           number
  modified:          number
  models:            Object
  observedVariables: ObservedVariables
  latentVariables:   LatentVariable[]

  static fromBackend(v: Project): Project {
    const p = new Project(v.name, [[]])
    p.uuid              = v.uuid
    p.created           = v.created
    p.modified          = v.modified
    p.models            = v.models
    p.observedVariables = ObservedVariables.fromBackend(v.observedVariables)
    p.latentVariables   = v.latentVariables || []
    return p
  }

  constructor(name: string,
              rawData: any[][]) {
    this.name = name
    this.uuid = uuidGen()

    const now = unixtime()
    this.created  = now
    this.modified = now

    this.models            = {}
    this.observedVariables = new ObservedVariables(rawData)
    this.latentVariables   = []
  }

  findObservedVariable(id: string): ObservedVariable {
    return this.observedVariables.find((v) => v.id === id)
  }

  findLatentVariable(id: string): LatentVariable {
    return this.latentVariables.find((v) => v.id === id)
  }

  removeLatentVariable(id: string) {
    this.latentVariables = this.latentVariables.filter((v) => v.id !== id)
  }

}
