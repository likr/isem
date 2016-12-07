import {Injectable} from '@angular/core'
import {Http, RequestOptions, Headers} from '@angular/http'
import {Project} from '../domain/project'
import {SEM_API_ENDPOINT} from '../constant'
import {ObservedVariable} from '../domain/variable'
import {
  LatentVariableRelation,
  Regression,
  Covariance,
  Intercept
} from '../domain/model/model'

const projectToJson = (project: Project): string => {
  const data = project.observedVariables.toArray()
    .reduce((obj: any, v: ObservedVariable) => {
      obj[v.id] = v.values
      return obj
    }, {})

  const latentVariable = project.model.latentVariableRelations
    .reduce((obj: any, v: LatentVariableRelation) => {
      obj[v[0]] = v[1]
      return obj
    }, {})

  const regression = project.model.regressions
    .reduce((obj: any, v: Regression) => {
      obj[v[0]] = v[1]
      return obj
    }, {})

  const covariance = project.model.covariances
    .reduce((obj: any, v: Covariance) => {
      obj[v[0]] = obj[v[0]] || []
      obj[v[0]].push(v[1])
      return obj
    }, {})

  const intercept = project.model.intercepts
    .reduce((obj: any, v: Intercept) => {
      obj[v[0]] = v[1]
      return obj
    }, {})

  const model = (() => {
    const obj = {} as any
    if (!!project.model.latentVariableRelations && 0 < project.model.latentVariableRelations.length) {
      obj['latent_variable'] = latentVariable
    }
    if (!!project.model.regressions && 0 < project.model.regressions.length) {
      obj['regressions'] = regression
    }
    if (!!project.model.covariances && 0 < project.model.covariances.length) {
      obj['covariance'] = covariance
    }
    if (!!project.model.intercepts && 0 < project.model.intercepts.length) {
      obj['intercept'] = intercept
    }
    return obj
  })()

  return JSON.stringify({data, model})
}

@Injectable()
export class SemAPI {

  constructor(private http: Http) {}

  post(project: Project): Promise<any> {
    const options = new RequestOptions({
      headers: new Headers({
        'Content-Type'               : 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    })

    const json = projectToJson(project)
    return this.http
      .post(SEM_API_ENDPOINT, json, options)
      .toPromise()
      .then((res) => res)
  }

}
