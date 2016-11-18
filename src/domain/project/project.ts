import {DEFAULT_NAME} from '../../constant'
import {
  Variable,
  LatentVariable,
  LatentVariables,
  ObservedVariable,
  ObservedVariables
} from '../variable'
import {uuidGen, unixtime, createNewName} from '../../utils'
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
    p.model             = Model            .fromBackend(v.model)
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
    this.observedVariables = ObservedVariables.fromData(rawData)
    this.latentVariables   = new LatentVariables()
  }

  findObservedVariable(id: string): ObservedVariable {
    return this.observedVariables.findById(id)
  }

  findLatentVariable(id: string): LatentVariable {
    return this.latentVariables.findById(id)
  }

  findVariable(id: string): Variable {
    const variable = this.findObservedVariable(id)
    return variable || this.findLatentVariable(id)
  }

  removeLatentVariable(id: string) {
    this.latentVariables.removeById(id)
  }

  addLatentVariable() {
    const existsNames = this.latentVariables.allKeys
    const name        = createNewName(existsNames, DEFAULT_NAME)
    const newVariable = new LatentVariable(name)
    this.latentVariables.add(newVariable)
  }

  renameLatentVariable(variableId: string, newKey: string) {
    const variable = this.findLatentVariable(variableId)
    variable.key = newKey
  }

  addCovariance(variable1Id: string, variable2Id: string) {
    this.model.addCovariance(
      this.findVariable(variable1Id),
      this.findVariable(variable2Id)
    )
  }

  addIntercept(variableId: string, value: number) {
    this.model.addIntercept(
      this.findVariable(variableId),
      value
    )
  }

  addLatentVariableRelation(latentVariableId: string, observedVariableIds: string[]) {
    const observedVariables = this.observedVariables
      .getFromSpecificIds(observedVariableIds)

    this.model.addLatentVariableRelation(
      this.findLatentVariable(latentVariableId),
      observedVariables
    )
  }

  addRegression(dependentVariableId: string, variableIds: string[]) {
    const variables = variableIds.map((id) => {
      return this.findVariable(id)
    })

    this.model.addRegression(
      this.findVariable(dependentVariableId),
      variables
    )
  }

  deleteRegression(id: string) {
    this.model.deleteRegression(id)
  }

  deleteLatentVariableRelation(id: string) {
    this.model.deleteLatentVariableRelation(id)
  }

  deleteCovariance(id: string) {
    this.model.deleteCovariance(id)
  }

  deleteIntercept(id: string) {
    this.model.deleteIntercept(id)
  }


}
