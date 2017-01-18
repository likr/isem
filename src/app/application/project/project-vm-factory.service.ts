import {Injectable} from '@angular/core'

import {Project} from '../../domain/project/project'
import {ProjectVm} from './project-vm'
import {ObservedVariableVm} from '../variable/observed-variable-vm'
import {LatentVariableVm} from '../variable/latent-variable-vm'
import {LOCALE} from '../../constant'
import {ModelVm} from '../model/model-vm'

@Injectable()
export class ProjectVmFactoryService {

  make(p: Project): ProjectVm {
    return new ProjectVm(
      p,
      new ModelVm(p.model, p.allVariables),
      p.observedVariables.toArray().map((v) => new ObservedVariableVm(v)),
      p.latentVariables  .toArray().map((v) => new LatentVariableVm(v)),
      LOCALE
    )
  }

  makeFromProjects(projects: Project[]): ProjectVm[] {
    return projects.map((p) => this.make(p))
  }

}
