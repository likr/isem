import {Injectable} from '@angular/core'
import {Observable, BehaviorSubject} from 'rxjs'

import {CsvToJsonAdapter} from './csv-to-json-adapter.service'
import {ProjectsDatabaseAdapter} from './projects-database.adapter'
import {Project} from './domain/project'

@Injectable()
export class ProjectsRepository {

  private getAllSubject: BehaviorSubject<Observable<Object[]>>

  constructor(private csvToJson: CsvToJsonAdapter,
              private projectsDb: ProjectsDatabaseAdapter) {
    this.getAllSubject = new BehaviorSubject(
      Observable.fromPromise(this.projectsDb.getAll())
    )
  }

  create(modelCsv: string): Promise<any> {
    const jsonObj = this.csvToJson.convert(modelCsv)
    const project = new Project('projectName', jsonObj)
    return this.projectsDb.addRow<Project>(project).then((v) => {
      this.publish()
      return v
    })
  }

  get all$(): Observable<Project[]> {
    return this.getAllSubject
      .mergeMap((v) => v)
  }

  private publish() {
    this.getAllSubject.next(
      Observable.fromPromise(this.projectsDb.getAll())
    )
  }

}
