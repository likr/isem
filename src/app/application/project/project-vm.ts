import {ObservedVariableVm} from '../variable/observed-variable-vm'
import {LatentVariableVm} from '../variable/latent-variable-vm'
import {Project} from '../../domain/project/project'
import {getDisplayDate} from '../../utils'
import {ModelVm} from '../model/model-vm'

export class ProjectVm {

  name: string
  uuid: string
  model: ModelVm
  observedVariables: ObservedVariableVm[]
  latentVariables: LatentVariableVm[]

  private locale: string
  private _created: number
  private _modified: number

  constructor(p: Project,
              model: ModelVm,
              observedVariables: ObservedVariableVm[],
              latentVariables: LatentVariableVm[],
              locale: string) {
    this.name              = p.name
    this.uuid              = p.uuid
    this.model             = model
    this.observedVariables = observedVariables
    this.latentVariables   = latentVariables

    this.locale    = locale
    this._created  = p.created
    this._modified = p.modified
  }

  get created(): string {
    return getDisplayDate(this._created, this.locale)
  }

  get modified(): string {
    return getDisplayDate(this._modified, this.locale)
  }

  findObservedVariable(id: string): ObservedVariableVm {
    return this.observedVariables.find((v) => v.id === id)
  }

  findLatentVariable(id: string): LatentVariableVm {
    return this.latentVariables.find((v) => v.id === id)
  }

}
