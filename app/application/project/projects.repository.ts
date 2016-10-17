import {Injectable} from '@angular/core'
import {Observable, Subject, BehaviorSubject} from 'rxjs'

import {CsvToJsonAdapter} from '../../services/csv-to-json-adapter.service'
import {ProjectsDatabaseAdapter} from '../../services/projects-database-adapter.service'
import {Project} from '../../domain/project/project'

@Injectable()
export class ProjectsRepository {

  private getAllSubject: BehaviorSubject<Observable<Object[]>>
  private getSingleSubject: Subject<Observable<Object[]>>

  constructor(private csvToJson: CsvToJsonAdapter,
              private projectsDb: ProjectsDatabaseAdapter) {
    this.getAllSubject = new BehaviorSubject(
      Observable.fromPromise(this.projectsDb.getAll())
    )
    this.getSingleSubject = new Subject()
  }

  create(projectName: string, modelCsv: string): Promise<any> {
    const jsonObj = this.csvToJson.convert(modelCsv)
    const project = new Project(projectName, jsonObj)
    return this.projectsDb.addRow<Project>(project).then((v) => {
      this.publish()
      return v
    })
  }

  delete(uuid: string): Promise<any> {
    return this.projectsDb.deleteRow(uuid).then((v) => {
      this.publish()
      return v
    })
  }

  emitQuerySingle(uuid: string) {
    this.getSingleSubject.next(
      Observable.fromPromise(this.projectsDb.getSingle(uuid).then((v) => v[0]))
    )
  }

  get all$(): Observable<Project[]> {
    return this.getAllSubject
      .mergeMap((v) => v)
      .map((v: Project[]) => v.map((p: Project) => Project.fromBackend(p)))
  }

  get single$(): Observable<Project> {
    return this.getSingleSubject
      .mergeMap((v) => v)
      .map((v) => Project.fromBackend(v))
  }

  private publish() {
    this.getAllSubject.next(
      Observable.fromPromise(this.projectsDb.getAll())
    )
  }

}
