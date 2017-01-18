import {Injectable} from '@angular/core'
import {Observable, BehaviorSubject, ReplaySubject} from 'rxjs'

import {CsvToJsonAdapterService} from '../../services/csv-to-json-adapter.service'
import {ProjectsDatabaseAdapterService} from '../../services/projects-database-adapter.service'
import {SemApiService} from '../../services/sem-api.service'
import {Project} from '../../domain/project/project'

@Injectable()
export class ProjectsRepositoryService {

  private getAllSubject: BehaviorSubject<Observable<Object[]>>
  private getSingleSubject: ReplaySubject<Observable<Object[]>>

  constructor(private csvToJson: CsvToJsonAdapterService,
              private db: ProjectsDatabaseAdapterService,
              private api: SemApiService) {
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
      const project = Project.fromBackend(v[0] as Project)
      project.addCovariance(variable1Id, variable2Id)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  addIntercept(uuid: string, variableId: string, value: number): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.addIntercept(variableId, value)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  addLatentVariableRelation(uuid: string, latentVariableId: string, observedVariableIds: string[]): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.addLatentVariableRelation(latentVariableId, observedVariableIds)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  addRegression(uuid: string, dependentVariableId: string, variableIds: string[]): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.addRegression(dependentVariableId, variableIds)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  removeRegression(uuid: string, targetId: string): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.removeRegression(targetId)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  removeLatentVariableRelation(uuid: string, targetId: string): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.removeLatentVariableRelation(targetId)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  removeCovariance(uuid: string, targetId: string): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.removeCovariance(targetId)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  removeIntercept(uuid: string, targetId: string): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      project.removeIntercept(targetId)

      return this.db.update(project).then((vv) => {
        this.publishSingle(uuid)
        return vv
      })
    })
  }

  calcSem(uuid: string): Promise<any> {
    return this.db.getSingle(uuid).then((v) => {
      const project = Project.fromBackend(v[0] as Project)
      return this.api.post(project).then((res) => res)
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
      .map((v) => Project.fromBackend(v as any)) /* TODO 170102: fix any casting */
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
