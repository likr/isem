import {Injectable} from '@angular/core'

import {Project} from '../../domain/project'
import {ProjectVM} from './project-vm'
import {ObservedVariableVM, LatentVariableVM} from '../variable'
import {LOCALE} from '../../constant'

@Injectable()
export class ProjectVMFactory {

  make(project: Project): ProjectVM {
    return new ProjectVM(
      project,
      project.observedVariables.map((v) => new ObservedVariableVM(v)),
      project.latentVariables  .map((v) => new LatentVariableVM(v)),
      LOCALE
    )
  }

  makeFromProjects(projects: Project[]): ProjectVM[] {
    return projects.map((p) => this.make(p))
  }

}
