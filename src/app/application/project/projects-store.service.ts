import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {ProjectsRepositoryService} from './projects-repository.service'
import {ProjectVmFactoryService} from './project-vm-factory.service'
import {ProjectVm} from './project-vm'
import {VariableVm} from '../variable/variable-vm'
import {ObservedVariableVm} from '../variable/observed-variable-vm'
import {LatentVariableVm} from '../variable/latent-variable-vm'
import {AppStoreService} from '../../app-store.service'
import {Expression} from '../model/model-vm'

import {getEstimateKeyName} from '../../components/viz/estimate-key-name'

const uuidToName = (rawJson: any, observedVariables: VariableVm[], latentVariables: VariableVm[]) => {
  let result = JSON.parse(JSON.stringify(rawJson)) // deep copy
  const variables = latentVariables.concat(observedVariables)

  for (const varName of ['covariances', 'regressions', 'latent_variables']) {
    for (const k of Object.keys(result[varName])) {
      let var1 = variables.find((v) => v.id === k)
      result[varName][var1.key] = result[varName][k]
      delete result[varName][k]

      for (const k2 of Object.keys(result[varName][var1.key])) {
        let var2 = variables.find((v) => v.id === result[varName][var1.key][k2].name)
        result[varName][var1.key][k2].name = var2.key
      }
    }
  }

  for (const varName of ['lat', 'obs']) {
    for (const k of Object.keys(result.names[varName])) {
      let variable = variables.find((v) => v.id === result.names[varName][k])
      result.names[varName][k] = variable.key
    }
  }

  for (const k of Object.keys(result.variances)) {
    let variable = variables.find((v) => v.id === k)
    result.variances[variable.key] = result.variances[k]
    delete result.variances[k]
  }

  for (const estimateKeyName of Object.keys(result.total_effects)) {
    for (const k of Object.keys(result.total_effects[estimateKeyName])) {
      let var1 = variables.find((v) => v.id === k)
      result.total_effects[estimateKeyName][var1.key] = result.total_effects[estimateKeyName][k]
      delete result.total_effects[estimateKeyName][k]

      for (const k2 of Object.keys(result.total_effects[estimateKeyName][var1.key])) {
        let var2 = variables.find((v) => v.id === k2)
        result.total_effects[estimateKeyName][var1.key][var2.key] = result.total_effects[estimateKeyName][var1.key][k2]
        delete result.total_effects[estimateKeyName][var1.key][k2]
      }
    }
  }

  return result
}

const linkColorScale = d3.scaleLinear()
  .domain([0, 1])
  .range(['#e74c3c', '#ecf0f1'])

const linkWidthScale = d3.scaleLinear()
  .domain([0, 1])
  .range([1, 10])

const genLink = (sourceVar, targetVar, value, p, group) => {
  const width = linkWidthScale(Math.abs(value))
  return {
    source: sourceVar,
    target: targetVar,
    label: value.toFixed(3),
    color: linkColorScale(p),
    strokeWidth: width,
    sourceMarkerShape: group == 'cov' ? 'triangle' : 'circle',
    sourceMarkerSize: 2 * width,
    targetMarkerShape: 'triangle',
    targetMarkerSize: 2 * width
  }
}

const buildGraph = (json, standardized) => {
  const { covariances, regressions, names } = json
  const lantentVariables = json.latent_variables
  const nodes = []
  const links = []
  const estimateKeyName = getEstimateKeyName(standardized)

  for (const name of names.obs) {
    nodes.push({
      name,
      type: 'rect',
      fill: '#16a085',
      labelStroke: '#16a085'
    })
  }
  for (const name of names.lat) {
    nodes.push({
      name,
      type: 'circle',
      fill: '#2980b9',
      labelStroke: '#2980b9'
    })
  }

  // 潜在変数の定義式より、リンクを作成
  for (const leftVarName in lantentVariables) {
    for (const rightVar of lantentVariables[leftVarName]) {
      links.push(genLink(leftVarName, rightVar.name, +rightVar[estimateKeyName], +rightVar['P(>|z|)'], null))
    }
  }

  // 回帰の式からリンクを作成
  for (const leftVarName in regressions) {
    for (const rightVar of regressions[leftVarName]) {
      links.push(genLink(rightVar.name, leftVarName, +rightVar[estimateKeyName], +rightVar['P(>|z|)'], null))
    }
  }

  // 共分散のリンクを作成
  for (const leftVarName in covariances) {
    for (const rightVar of covariances[leftVarName]) {
      links.push(genLink(leftVarName, rightVar.name, +rightVar[estimateKeyName], +rightVar['P(>|z|)'], 'cov'))
    }
  }

  // 直接効果の合計を計算
  for (const edge of links) {
    if (edge.group === 'cov') {
      continue
    }
    for (const node of nodes) {
      if (node.id === edge.source) node.value += edge.value
    }
  }

  return {nodes, links}
}

@Injectable()
export class ProjectsStoreService {

  constructor(private store: AppStoreService,
              private repository: ProjectsRepositoryService,
              private projectVmFactory: ProjectVmFactoryService) {}

  get allProjects$(): Observable<ProjectVm[]> {
    return this.repository.all$.map((p) => {
      return this.projectVmFactory.makeFromProjects(p)
    })
  }

  get currentProject$(): Observable<ProjectVm> {
    return this.repository.single$.map((p) => {
      return this.projectVmFactory.make(p)
    })
  }

  get currentObservedVariable$(): Observable<ObservedVariableVm> {
    return Observable.combineLatest(
      this.currentProject$,
      this.store.observable
    ).map((v) => {
      const [project, st] = v
      return project.findObservedVariable(st.targetObservedVariableId)
    })
  }

  get currentLatentVariable$(): Observable<LatentVariableVm> {
    return Observable.combineLatest(
      this.currentProject$,
      this.store.observable
    ).map((v) => {
      const [project, st] = v
      return project.findLatentVariable(st.targetLatentVariableId)
    })
  }

  get observedVariables$(): Observable<ObservedVariableVm[]> {
    return this.currentProject$.map((p) => p.observedVariables)
  }

  get latentVariables$(): Observable<LatentVariableVm[]> {
    return this.currentProject$.map((p) => p.latentVariables)
  }

  get covariances$(): Observable<Expression[]> {
    return this.currentProject$.map((p) => p.model.covariances)
  }

  get intercepts$(): Observable<Expression[]> {
    return this.currentProject$.map((p) => p.model.intercepts)
  }

  get latentVariableRelations$(): Observable<Expression[]> {
    return this.currentProject$.map((p) => p.model.latentVariableRelations)
  }

  get regressions$(): Observable<Expression[]> {
    return this.currentProject$.map((p) => p.model.regressions)
  }

  get variables$(): Observable<VariableVm[]> {
    return this.currentProject$.map((p) => {
      return (<VariableVm[]>p.observedVariables).concat(<VariableVm[]>p.latentVariables)
    })
  }

  get vizData$(): Observable<any> {
    return Observable.combineLatest(
      this.store.data$.filter((v) => v.names),
      this.observedVariables$,
      this.latentVariables$
    ).map(([data, observedVariables, latentVariables]) => {
      return uuidToName(data, observedVariables, latentVariables)
    })
  }

  get graph$(): Observable<any> {
    return this.vizData$.map((json) => {
      return buildGraph(json, true)
    })
  }
}
