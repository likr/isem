import {
  Variable,
  LatentVariable,
  LatentVariables,
  ObservedVariable,
  ObservedVariables
} from '../variable'
import {uuidGen, unixtime} from '../../utils'

export interface Models {
  covariance?: {[key: string]: string[]}
}

export class Project {

  name:              string
  uuid:              string
  created:           number
  modified:          number
  models:            Models
  observedVariables: ObservedVariables
  latentVariables:   LatentVariables

  static fromBackend(v: Project): Project {
    const p = new Project(v.name, [[]])

    Object.keys(p).forEach((key) => (<any>p)[key] = (<any>v)[key])
    p.observedVariables = ObservedVariables.fromBackend(v.observedVariables)
    p.latentVariables   = LatentVariables  .fromBackend(v.latentVariables)

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
    this.latentVariables   = new LatentVariables()
  }

  findObservedVariable(id: string): ObservedVariable {
    return this.observedVariables.find((v) => v.id === id)
  }

  findLatentVariable(id: string): LatentVariable {
    return this.latentVariables.find((v) => v.id === id)
  }

  findVariable(id: string): Variable {
    const variable = this.findObservedVariable(id)
    return variable || this.findLatentVariable(id)
  }

  removeLatentVariable(id: string) {
    this.latentVariables = this.latentVariables.filter((v) => v.id !== id)
  }

}
