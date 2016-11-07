import {Injectable} from '@angular/core'
import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs'

import {CsvToJsonAdapter, ProjectsDatabaseAdapter} from '../../services'
import {Project} from '../../domain/project'

@Injectable()
export class ProjectsRepository {

  private getAllSubject: BehaviorSubject<Observable<Object[]>>
  private getSingleSubject: ReplaySubject<Observable<Object[]>>

  constructor(private csvToJson: CsvToJsonAdapter,
              private db: ProjectsDatabaseAdapter) {
    this.getAllSubject = new BehaviorSubject(
      Observable.fromPromise(this.db.getAll())
    )
    this.getSingleSubject = new ReplaySubject(1)
  }

  create(projectName: string, modelCsv: string): Promise<any> {
    const jsonObj = this.csvToJson.convert(modelCsv)
    const project = new Project(projectName, jsonObj)

    return this.db.addRow(project).then((v) => {
      this.publishAll()
      return v
    })
  }

  delete(uuid: string): Promise<any> {
    return this.db.deleteRow(uuid).then((v) => {
      this.publishAll()
      return v
    })
  }

  addLatentVariable(uuid: string): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.addLatentVariable()

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  removeLatentVariable(uuid: string, variableId: string) {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.removeLatentVariable(variableId)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  changeLatentVariableKey(uuid: string, variableId: string, newKey: string) {
    return this.db.getSingle(uuid).then((v) => {
      const project  = Project.fromBackend(v[0] as Project)
      project.renameLatentVariable(variableId, newKey)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  addCovariance(uuid: string, variable1Id: string, variable2Id: string): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project     = Project.fromBackend(v[0] as Project)
      const variable1key = project.findVariable(variable1Id).key
      const variable2key = project.findVariable(variable2Id).key

      project.models.covariance               = project.models.covariance || {}
      project.models.covariance[variable1key] = project.models.covariance[variable1key] || []
      project.models.covariance[variable1key].push(variable2key)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  emitQuerySingle(uuid: string) {
    this.publishSingle(uuid)
  }

  get all$(): Observable<Project[]> {
    return this.getAllSubject
      .mergeMap((v) => v)
      .map((v: Project[]) => v.map((p: Project) => Project.fromBackend(p)))
  }

  get single$(): Observable<Project> {
    return this.getSingleSubject
      .mergeMap((v) => v)
      .map((v) => Project.fromBackend(v as Project))
  }

  private publishAll() {
    this.getAllSubject.next(
      Observable.fromPromise(this.db.getAll())
    )
  }

  private publishSingle(uuid: string) {
    this.getSingleSubject.next(
      Observable.fromPromise(this.db.getSingle(uuid).then((v) => v[0]))
    )
  }

}
