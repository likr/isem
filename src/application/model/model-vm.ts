import {Model} from '../../domain/model'
import {Variable, Variables} from '../../domain/variable'

export type Expression = {id: string, label: string}

const makeExpression = (id: string,
                        left: string,
                        operator: string,
                        right: string): Expression => {
  return {id, label: [left, operator, right].join(' ')}
}

export class ModelVM {

  regressions:             Expression[]
  latentVariableRelations: Expression[]
  covariances:             Expression[]
  intercepts:              Expression[]

  constructor(m: Model, vars: Variables<Variable>) {
    this.regressions = m.regressions.map((v) => {
      const l = vars.findById(v[0]).key
      const r = v[1].map((vv) => vars.findById(vv).key).join(' + ')
      return makeExpression(v[0], l, '~', r)
    })

    this.latentVariableRelations = m.latentVariableRelations.map((v) => {
      const l = vars.findById(v[0]).key
      const r = v[1].map((vv) => vars.findById(vv).key).join(' + ')
      return makeExpression(v[0], l, '=~', r)
    })

    this.covariances = m.covariances.map((v) => {
      const l = vars.findById(v[0]).key
      const r = vars.findById(v[1]).key
      return makeExpression(v[0], l, '~~', r)
    })

    this.intercepts = m.intercepts.map((v) => {
      const l = vars.findById(v[0]).key
      const r = v[1].toString()
      return makeExpression(v[0], l, '~', r)
    })
  }

}
