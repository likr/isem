import {Variable, LatentVariable, ObservedVariables} from '../variable'

export class Model {

  covariances:             [Variable, Variable][]
  intercepts:              [Variable, number][]
  latentVariableRelations: [LatentVariable, ObservedVariables][]
  regressions:             [Variable, Variable[]][]

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

  addCovariance(variable1: Variable, variable2: Variable) {
    this.covariances.push([variable1, variable2])
  }

  addIntercept(variable: Variable, value: number) {
    this.intercepts.push([variable, value])
  }

  addLatentVariableRelation(latentVariable: LatentVariable, observedVariables: ObservedVariables) {
    this.latentVariableRelations.push([latentVariable, observedVariables])
  }

  addRegression(variable: Variable, variables: Variable[]) {
    this.regressions.push([variable, variables])
  }

}
