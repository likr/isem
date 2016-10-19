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

  constructor(project: Project,
              observedVariables: ObservedVariableVM[],
              latentVariables: LatentVariableVM[],
              locale: string) {
    this.name              = project.name
    this.uuid              = project.uuid
    this.models            = project.models
    this.observedVariables = observedVariables
    this.latentVariables   = latentVariables

    this.locale    = locale
    this._created  = project.created
    this._modified = project.modified
  }

  get created(): string {
    return getDisplayDate(this._created, this.locale)
  }

  get modified(): string {
    return getDisplayDate(this._modified, this.locale)
  }

}
