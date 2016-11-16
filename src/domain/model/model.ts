import {Variable, LatentVariable, ObservedVariables} from '../variable'

export class Model {

  covariances:             [Variable, Variable][]
  intercepts:              [Variable, number][]
  latentVariableRelations: [LatentVariable, ObservedVariables][]
  regressions:             [Variable, Variable[]][]

  static fromBackend(v: Model): Model {
    const m = new Model()

    m.covariances = (() => {
      if (!v.covariances) {
        return []
      }
      return v.covariances.map((vv) => {
        return [
          Variable.fromBackend(vv[0]),
          Variable.fromBackend(vv[1])
        ]
      }) as [Variable, Variable][]
    })()

    m.intercepts = (() => {
      if (!v.intercepts) {
        return []
      }
      return v.intercepts.map((vv) => {
        return [
          Variable.fromBackend(vv[0]),
          vv[1]
        ]
      }) as [Variable, number][]
    })()

    m.latentVariableRelations = (() => {
      if (!v.latentVariableRelations) {
        return []
      }
      return v.latentVariableRelations.map((vv) => {
        return [
          LatentVariable.fromBackend(vv[0]),
          ObservedVariables.fromBackend(vv[1])
        ]
      }) as [LatentVariable, ObservedVariables][]
    })()

    m.regressions = (() => {
      if (!v.regressions) {
        return []
      }
      return v.regressions.map((vv) => {
        return [
          Variable.fromBackend(vv[0]),
          vv[1].map((variable) => Variable.fromBackend(variable))
        ]
      }) as [Variable, Variable[]][]
    })()

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
