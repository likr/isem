import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {ProjectsRepository} from './projects.repository'
import {ProjectVMFactory} from './project-vm-factory'
import {ProjectVM} from './project-vm'
import {VariableVM, ObservedVariableVM, LatentVariableVM} from '../variable'
import {AppStore} from '../app'
import {Expression} from '../model/model-vm'

@Injectable()
export class ProjectsStore {

  constructor(private store: AppStore,
              private repository: ProjectsRepository,
              private projectVMFactory: ProjectVMFactory) {}

  get allProjects$(): Observable<ProjectVM[]> {
    return this.repository.all$.map((p) => {
      return this.projectVMFactory.makeFromProjects(p)
    })
  }

  get currentProject$(): Observable<ProjectVM> {
    return this.repository.single$.map((p) => {
      return this.projectVMFactory.make(p)
    })
  }

  get currentObservedVariable$(): Observable<ObservedVariableVM> {
    return Observable.zip(
      this.currentProject$,
      this.store.observable
    ).map((v) => {
      const [project, st] = v
      return project.findObservedVariable(st.targetObservedVariableId)
    })
  }

  get currentLatentVariable$(): Observable<LatentVariableVM> {
    return Observable.zip(
      this.currentProject$,
      this.store.observable
    ).map((v) => {
      const [project, st] = v
      return project.findLatentVariable(st.targetLatentVariableId)
    })
  }

  get observedVariables$(): Observable<ObservedVariableVM[]> {
    return this.currentProject$.map((p) => p.observedVariables)
  }

  get latentVariables$(): Observable<LatentVariableVM[]> {
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

  get variables$(): Observable<VariableVM[]> {
    return this.currentProject$.map((p) => {
      return (<VariableVM[]>p.observedVariables).concat(<VariableVM[]>p.latentVariables)
    })
  }

}
