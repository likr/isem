import {Model} from '../../domain/model'

export class ModelVM {

  regressions:             {id: string, label: string}[]
  latentVariableRelations: {id: string, label: string}[]
  covariances:             {id: string, label: string}[]
  intercepts:              {id: string, label: string}[]

  constructor(m: Model) {
    this.regressions = m.regressions.map((v) => {
      const key       = v[0].key
      const variables = v[1].map((vv) => vv.key).join(' + ')
      return {
        id   : v[0].id,
        label: `${key} ~ ${variables}`
      }
    })

    this.latentVariableRelations = m.latentVariableRelations.map((v) => {
      const key               = v[0].key
      const observedVariables = v[1].allKeys.join(' + ')
      return {
        id   : v[0].id,
        label: `${key} =~ ${observedVariables}`
      }
    })

    this.covariances = m.covariances.map((v) => {
      return {
        id   : v[0].id,
        label: `${v[0].key} ~~ ${v[1].key}`
      }
    })

    this.intercepts = m.intercepts.map((v) => {
      const key   = v[0].key
      const value = v[1]
      return {
        id   : v[0].id,
        label: `${key} ~ ${value}`
      }
    })
  }

}
