import {Model} from '../../domain/model/model'
import {Variable} from '../../domain/variable/variable'
import {Variables} from '../../domain/variable/variables'

export type Expression = {id: string, label: string}

const makeExpression = (id: string,
                        left: string,
                        operator: string,
                        right: string): Expression => {
  return {id, label: [left, operator, right].join(' ')}
}

const makeCovariances = (model: Model, vars: Variables<Variable>): Expression[] => {
  const alreadyMade = [] as string[]
  return model.covariances.map((v) => {
    const l = vars.findById(v[0]).key
    if (alreadyMade.find((vv) => vv === l)) {
      return
    }

    const exists = model.covariances.filter((vv) => vars.findById(vv[0]).key === l)

    const r = exists.length === 1
      ? vars.findById(v[1]).key
      : exists.map((vv) => vars.findById(vv[1]).key).join(' + ')

    alreadyMade.push(l)
    return makeExpression(v[0], l, '~~', r)
  }).filter((v) => !!v)
}

export class ModelVm {

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

    this.covariances = makeCovariances(m, vars)

    this.intercepts = m.intercepts.map((v) => {
      const l = vars.findById(v[0]).key
      const r = v[1].toString()
      return makeExpression(v[0], l, '~', r)
    })
  }

}
