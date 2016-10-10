import {Project, Data} from '../../domain/project'

export class ProjectVM {

  readonly name: string
  readonly uuid: string
  readonly created: number
  readonly modified: number
  readonly models: Object
  readonly data: Data

  constructor(project: Project) {
    this.name     = project.name
    this.uuid     = project.uuid
    this.created  = project.created
    this.modified = project.modified
    this.models   = project.models
    this.data     = project.data
  }

}