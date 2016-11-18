import {Variable, Variables, LatentVariable, ObservedVariables} from '../variable'

export class Model {

  covariances:             [string, string][]
  intercepts:              [string, number][]
  latentVariableRelations: [string, string[]][]
  regressions:             [string, string[]][]

  static fromBackend(v: Model): Model {
    const m = new Model()

    m.covariances             = v.covariances             || []
    m.intercepts              = v.intercepts              || []
    m.latentVariableRelations = v.latentVariableRelations || []
    m.regressions             = v.regressions             || []

    return m
  }

  constructor() {
    this.covariances             = []
    this.intercepts              = []
    this.latentVariableRelations = []
    this.regressions             = []
  }

  addCovariance(variable1: Variable,
                variable2: Variable) {
    const exists = this.covariances.find((v) => v[0] === variable1.id)
    if (exists) {
      exists[1] = variable2.id
      return
    }

    this.covariances.push([
      variable1.id,
      variable2.id
    ])
  }

  addIntercept(variable: Variable,
               value: number) {
    const exists = this.intercepts.find((v) => v[0] === variable.id)
    if (exists) {
      exists[1] = value
      return
    }

    this.intercepts.push([
      variable.id,
      value
    ])
  }

  addLatentVariableRelation(latentVariable: LatentVariable,
                            observedVariables: ObservedVariables) {
    const observedVariableIds = observedVariables.allIds
    const exists = this.latentVariableRelations.find((v) => v[0] === latentVariable.id)
    if (exists) {
      exists[1] = observedVariableIds
      return
    }

    this.latentVariableRelations.push([
      latentVariable.id,
      observedVariableIds
    ])
  }

  addRegression(variable: Variable,
                variables: Variables<Variable>) {
    const variableIds = variables.allIds
    const exists = this.regressions.find((v) => v[0] === variable.id)
    if (exists) {
      exists[1] = variableIds
      return
    }

    this.regressions.push([
      variable.id,
      variableIds
    ])
  }

  removeRegression(id: string) {
    this.regressions = this.regressions.filter((v) => v[0] !== id)
  }

  removeLatentVariableRelation(id: string) {
    this.latentVariableRelations = this.latentVariableRelations.filter((v) => v[0] !== id)
  }

  removeCovariance(id: string) {
    this.covariances = this.covariances.filter((v) => v[0] !== id)
  }

  removeIntercept(id: string) {
    this.intercepts = this.intercepts.filter((v) => v[0] !== id)
  }


}
