import {Injectable} from '@angular/core'

import {Project} from '../../domain/project'
import {ProjectVM} from './project-vm'
import {ObservedVariableVM, LatentVariableVM} from '../variable'
import {LOCALE} from '../../constant'

@Injectable()
export class ProjectVMFactory {

  make(p: Project): ProjectVM {
    return new ProjectVM(
      p,
      p.observedVariables.map((v) => new ObservedVariableVM(v)),
      p.latentVariables  .map((v) => new LatentVariableVM(v)),
      LOCALE
    )
  }

  makeFromProjects(projects: Project[]): ProjectVM[] {
    return projects.map((p) => this.make(p))
  }

}
