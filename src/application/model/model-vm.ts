import {Model} from '../../domain/model'

export class ModelVM {

  regressions:             string[]
  latentVariableRelations: string[]
  covariances:             string[]
  intercepts:              string[]

  constructor(m: Model) {
    this.regressions = m.regression.map((v) => {
      const key       = v[0].key
      const variables = v[1].map((vv) => vv.key).join(' + ')
      return `${key} ~ ${variables}`
    })

    this.latentVariableRelations = m.latentVariable.map((v) => {
      const key               = v[0].key
      const observedVariables = v[1].map((vv) => vv.key).join(' + ')
      return `${key} =~ ${observedVariables}`
    })

    this.covariances = m.covariance.map((v) => {
      return `${v[0].key} ~~ ${v[1].key}`
    })

    this.intercepts = m.intercept.map((v) => {
      const key   = v[0].key
      const value = v[1]
      return `${key} ~ ${value}`
    })
  }

}
