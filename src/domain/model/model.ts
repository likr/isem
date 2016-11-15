import {Variable, LatentVariable, ObservedVariables} from '../variable'

export class Model {

  covariance:     [Variable, Variable][]
  intercept:      [Variable, number][]
  latentVariable: [LatentVariable, ObservedVariables][]
  regression:     [Variable, Variable[]][]

  static fromBackend(v: Model): Model {
    const m = new Model()
    m.covariance     = v.covariance     || []
    m.intercept      = v.intercept      || []
    m.latentVariable = v.latentVariable || []
    m.regression     = v.regression     || []
    return m
  }

  constructor() {
    this.covariance     = []
    this.intercept      = []
    this.latentVariable = []
    this.regression     = []
  }

  addCovariance(variable1: Variable, variable2: Variable) {
    this.covariance.push([variable1, variable2])
  }

  addIntercept(variable: Variable, value: number) {
    this.intercept.push([variable, value])
  }

  addLatentVariableRelation(latentVariable: LatentVariable, observedVariables: ObservedVariables) {
    this.latentVariable.push([latentVariable, observedVariables])
  }

  addRegression(variable: Variable, variables: Variable[]) {
    this.regression.push([variable, variables])
  }

}
