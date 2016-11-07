import {
  Variable,
  LatentVariable,
  LatentVariables,
  ObservedVariable,
  ObservedVariables
} from '../variable'
import {uuidGen, unixtime} from '../../utils'
import {Model} from '../model'

export class Project {

  name:              string
  uuid:              string
  created:           number
  modified:          number
  model:             Model
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

    this.model             = new Model()
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

  addLatentVariable() {
    const newVariable = new LatentVariable('new variable')
    this.latentVariables.add(newVariable)
  }

  renameLatentVariable(variableId: string, newKey: string) {
    const variable = this.findLatentVariable(variableId)
    variable.key = newKey
  }

  addCovariance(variable1Id: string, variable2Id: string) {
    this.model.addCovariance(
      this.findVariable(variable1Id).key,
      this.findVariable(variable2Id).key
    )
  }

}
