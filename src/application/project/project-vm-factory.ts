import {Injectable} from '@angular/core'

import {Project} from '../../domain/project'
import {ProjectVM} from './project-vm'
import {ObservedVariableVM, LatentVariableVM} from '../variable'
import {LOCALE} from '../../constant'
import {ModelVM} from '../model'

@Injectable()
export class ProjectVMFactory {

  make(p: Project): ProjectVM {
    return new ProjectVM(
      p,
      new ModelVM(p.model, p.allVariables),
      p.observedVariables.toArray().map((v) => new ObservedVariableVM(v)),
      p.latentVariables  .toArray().map((v) => new LatentVariableVM(v)),
      LOCALE
    )
  }

  makeFromProjects(projects: Project[]): ProjectVM[] {
    return projects.map((p) => this.make(p))
  }

}
