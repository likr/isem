import {Injectable} from '@angular/core'

import {LOCALE} from '../../constant'
import {Project} from '../../domain/project/project'
import {ProjectVM} from './project-vm'
import {ObservedVariableVM} from "../variable/observed-variable-vm";

@Injectable()
export class ProjectVMFactory {

  make(project: Project): ProjectVM {
    return new ProjectVM(
      project,
      project.observedVariables.map((v) => new ObservedVariableVM(v)),
      LOCALE
    )
  }

  makeFromProjects(projects: Project[]): ProjectVM[] {
    return projects.map((p) => {
      return this.make(p)
    })
  }

}
