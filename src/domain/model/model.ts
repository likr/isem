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

  addCovariance(variable1: Variable,
                variable2: Variable) {
    const exists = this.covariances.find((v) => v[0].id === variable1.id)
    if (exists) {
      exists[1] = variable2
      return
    }

    this.covariances.push([
      variable1,
      variable2
    ])
  }

  addIntercept(variable: Variable,
               value: number) {
    const exists = this.intercepts.find((v) => v[0].id === variable.id)
    if (exists) {
      exists[1] = value
      return
    }

    this.intercepts.push([
      variable,
      value
    ])
  }

  addLatentVariableRelation(latentVariable: LatentVariable,
                            observedVariables: ObservedVariables) {
    const exists = this.latentVariableRelations.find((v) => v[0].id === latentVariable.id)
    if (exists) {
      exists[1] = observedVariables
      return
    }

    this.latentVariableRelations.push([
      latentVariable,
      observedVariables
    ])
  }

  addRegression(variable: Variable,
                variables: Variable[]) {
    const exists = this.regressions.find((v) => v[0].id === variable.id)
    if (exists) {
      exists[1] = variables
      return
    }

    this.regressions.push([
      variable,
      variables
    ])
  }

  removeRegression(id: string) {
    this.regressions = this.regressions.filter((v) => v[0].id !== id)
  }

  removeLatentVariableRelation(id: string) {
    this.latentVariableRelations = this.latentVariableRelations.filter((v) => v[0].id !== id)
  }

  removeCovariance(id: string) {
    this.covariances = this.covariances.filter((v) => v[0].id !== id)
  }

  removeIntercept(id: string) {
    this.intercepts = this.intercepts.filter((v) => v[0].id !== id)
  }


}
