import {ObservedVariableVM, LatentVariableVM} from '../variable'
import {Project} from '../../domain/project'
import {getDisplayDate} from '../../utils'

export class ProjectVM {

  name: string
  uuid: string
  models: Object
  observedVariables: ObservedVariableVM[]
  latentVariables: LatentVariableVM[]

  private locale: string
  private _created: number
  private _modified: number

  constructor(p: Project,
              observedVariables: ObservedVariableVM[],
              latentVariables: LatentVariableVM[],
              locale: string) {
    this.name              = p.name
    this.uuid              = p.uuid
    this.models            = p.models
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

  findObservedVariable(id: string): ObservedVariableVM {
    return this.observedVariables.find((v) => v.id === id)
  }

  findLatentVariable(id: string): LatentVariableVM {
    return this.latentVariables.find((v) => v.id === id)
  }

}
