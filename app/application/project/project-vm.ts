import {Project} from '../../domain/project/project'
import {getDisplayDate} from '../../utils/display-date'
import {ObservedVariableVM} from '../variable/observed-variable-vm'

export class ProjectVM {

  name: string
  uuid: string
  models: Object
  observedVariables: ObservedVariableVM[]
  latentVariables: any[]

  private locale: string
  private _created: number
  private _modified: number

  constructor(project: Project,
              observedVariables: ObservedVariableVM[],
              locale: string) {
    this.name              = project.name
    this.uuid              = project.uuid
    this.models            = project.models
    this.observedVariables = observedVariables
    this.latentVariables   = project.latentVariables

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
