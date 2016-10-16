import {Project, Data} from '../../domain/project/project'
import {getDisplayDate} from '../../utils/display-date'

export class ProjectVM {

  readonly name: string
  readonly uuid: string
  readonly models: Object
  readonly data: Data

  private locale: string
  private _created: number
  private _modified: number

  constructor(project: Project,
              locale: string) {
    this.name    = project.name
    this.uuid    = project.uuid
    this.models  = project.models
    this.data    = project.data

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