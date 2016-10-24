import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {ProjectsRepository} from './projects.repository'
import {ProjectVMFactory} from './project-vm-factory'
import {ProjectVM} from './project-vm'
import {ObservedVariableVM, LatentVariableVM} from '../variable'
import {AppStore} from '../app'

@Injectable()
export class ProjectsStore {

  constructor(private store: AppStore,
              private projectsRepository: ProjectsRepository,
              private projectVMFactory: ProjectVMFactory) {}

  get allProjects$(): Observable<ProjectVM[]> {
    return this.projectsRepository.all$.map((projects) => {
      return this.projectVMFactory.makeFromProjects(projects)
    })
  }

  get currentProject$(): Observable<ProjectVM> {
    return this.projectsRepository.single$.map((project) => {
      return this.projectVMFactory.make(project)
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
    return this.currentProject$.map((project) => {
      return project.observedVariables
    })
  }

  get latentVariables$(): Observable<LatentVariableVM[]> {
    return this.currentProject$.map((project) => {
      return project.latentVariables
    })
  }

}
