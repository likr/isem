import {Injectable} from '@angular/core'

import {LOCALE} from '../../constant'
import {Project} from '../../domain/project/project'
import {ProjectVM} from './project-vm'
import {ObservedVariableVM} from '../variable/observed-variable-vm'
import {LatentVariableVM} from '../variable/latent-variable-vm'

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
