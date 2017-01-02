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
    return Observable.zip(
      this.currentProject$,
      this.store.observable
    ).map((v) => {
      const [project, st] = v
      return project.findObservedVariable(st.targetObservedVariableId)
    })
  }

  get currentLatentVariable$(): Observable<LatentVariableVm> {
    return Observable.zip(
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

}
