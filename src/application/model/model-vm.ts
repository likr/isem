import {Model} from '../../domain/model'

export class ModelVM {

  regressions:             string[]
  latentVariableRelations: string[]
  covariances:             string[]
  intercepts:              string[]

  constructor(m: Model) {
    this.regressions = m.regressions.map((v) => {
      const key       = v[0].key
      const variables = v[1].map((vv) => vv.key).join(' + ')
      return `${key} ~ ${variables}`
    })

    this.latentVariableRelations = m.latentVariableRelations.map((v) => {
      const key               = v[0].key
      const observedVariables = v[1].allKeys.join(' + ')
      return `${key} =~ ${observedVariables}`
    })

    this.covariances = m.covariances.map((v) => {
      return `${v[0].key} ~~ ${v[1].key}`
    })

    this.intercepts = m.intercepts.map((v) => {
      const key   = v[0].key
      const value = v[1]
      return `${key} ~ ${value}`
    })
  }

}
