import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {ProjectsRepository} from './projects.repository'
import {ProjectVM} from './project-vm'
import {ProjectVMFactory} from './project-vm-factory'
import {ObservedVariableVM} from '../variable/observed-variable-vm'

@Injectable()
export class ProjectsStore {

  constructor(private projectsRepository: ProjectsRepository,
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

  get observedVariables$(): Observable<ObservedVariableVM[]> {
    return this.currentProject$.map((project) => {
      return project.observedVariables
    })
  }

}
