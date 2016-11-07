export class Model {

  covariance:     [string, string][]
  intercept:      {[key: string]: number}
  latentVariable: {[key: string]: string[]}
  regression:     {[key: string]: string[]}

  static fromBackend(v: Model): Model {
    const m = new Model()
    m.covariance     = v.covariance
    m.intercept      = v.intercept
    m.latentVariable = v.latentVariable
    m.regression     = v.regression
    return m
  }

  constructor() {
    this.covariance     = []
    this.intercept      = {}
    this.latentVariable = {}
    this.regression     = {}
  }

  addCovariance(variable1Key: string, variable2Key: string) {
    this.covariance.push([variable1Key, variable2Key])
  }

  addIntercept(key: string, value: number) {
    this.intercept[key] = value
  }

  addLatentVariableRelation(key: string, observedVariableKeys: string[]) {
    this.latentVariable[key] = observedVariableKeys
  }

  addRegression(key: string, variableKeys: string[]) {
    this.regression[key] = variableKeys
  }

}
