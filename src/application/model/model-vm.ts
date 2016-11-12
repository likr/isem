import {Model} from '../../domain/model'

export class ModelVM {

  covariances: string[]
  intercepts: string[]
  latentVariableRelations: string[]
  regressions: string[]

  constructor(m: Model) {
    this.regressions = Object.keys(m.regression).map((v) => {
      const variables = m.regression[v].join(' + ')
      return `${v} ~ ${variables}`
    })

    this.latentVariableRelations = Object.keys(m.latentVariable).map((v) => {
      const observedVariables = m.latentVariable[v].join(' + ')
      return `${v} =~ ${observedVariables}`
    })

    this.covariances = m.covariance.map((v) => {
      return `${v[0]} ~~ ${v[1]}`
    })

    this.intercepts = Object.keys(m.intercept).map((v) => {
      return `${v} ~ ${m.intercept[v]}`
    })
  }

}
