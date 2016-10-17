import {Project} from '../../domain/project/project'
import {getDisplayDate} from '../../utils/display-date'
import {ObservedVariables} from '../../domain/variable/observed-variables'

export class ProjectVM {

  readonly name: string
  readonly uuid: string
  readonly models: Object
  readonly observedVariables: ObservedVariables

  private locale: string
  private _created: number
  private _modified: number

  constructor(project: Project,
              locale: string) {
    this.name              = project.name
    this.uuid              = project.uuid
    this.models            = project.models
    this.observedVariables = project.observedVariables

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
