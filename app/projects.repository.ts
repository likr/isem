import {Injectable} from '@angular/core'

import {CsvToJsonAdapter} from './csv-to-json-adapter.service'
import {ProjectsDatabaseAdapter} from './projects-database.adapter'
import {Project} from './domain/project'

@Injectable()
export class ProjectsRepository {

  constructor(private csvToJson: CsvToJsonAdapter,
              private projectsDb: ProjectsDatabaseAdapter) {}

  create(modelCsv: string): Promise<any> {
    const jsonObj = this.csvToJson.convert(modelCsv)
    const project = new Project('projectName', jsonObj)
    return this.projectsDb.addRow<Project>(project)
  }

  getAll(): Promise<Project[]> {
    return this.projectsDb.getAll()
  }

}
