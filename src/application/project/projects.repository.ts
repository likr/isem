import {Injectable} from '@angular/core'
import {Observable, Subject, BehaviorSubject, ReplaySubject} from 'rxjs'

import {CsvToJsonAdapter, ProjectsDatabaseAdapter} from '../../services'
import {Project} from '../../domain/project'
import {LatentVariable} from '../../domain/variable'

@Injectable()
export class ProjectsRepository {

  private getAllSubject: BehaviorSubject<Observable<Object[]>>
  private getSingleSubject: Subject<Observable<Object[]>>

  constructor(private csvToJson: CsvToJsonAdapter,
              private projectsDb: ProjectsDatabaseAdapter) {
    this.getAllSubject = new BehaviorSubject(
      Observable.fromPromise(this.projectsDb.getAll())
    )
    this.getSingleSubject = new ReplaySubject()
  }

  create(projectName: string, modelCsv: string): Promise<any> {
    const jsonObj = this.csvToJson.convert(modelCsv)
    const project = new Project(projectName, jsonObj)
    return this.projectsDb.addRow(project).then((v) => {
      this.publishAll()
      return v
    })
  }

  delete(uuid: string): Promise<any> {
    return this.projectsDb.deleteRow(uuid).then((v) => {
      this.publishAll()
      return v
    })
  }

  addLatentVariable(uuid: string): Promise<any> {
    return this.projectsDb.getSingle(uuid).then((v) => {
      const project     = Project.fromBackend(v[0] as Project)
      const newVariable = new LatentVariable('new variable')
      project.latentVariables.push(newVariable)
      return this.projectsDb.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  changeLatentVariableKey(uuid: string, variableId: string, newKey: string) {
    return this.projectsDb.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      const variable = project.findLatentVariable(variableId)
      variable.key = newKey

      return this.projectsDb.update(project).then((vv) => {
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
      Observable.fromPromise(this.projectsDb.getAll())
    )
  }

  private publishSingle(uuid: string) {
    this.getSingleSubject.next(
      Observable.fromPromise(this.projectsDb.getSingle(uuid).then((v) => v[0]))
    )
  }

}
