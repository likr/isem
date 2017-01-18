import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

const DUMMY = ['dummy']

@Injectable()
export class MockProjectsStoreService {
  get allProjects$() {
    return Observable.from([DUMMY])
  }
  get currentProject$() {
    return Observable.from([DUMMY])
  }
  get currentObservedVariable$() {
    return Observable.from([DUMMY])
  }
  get currentLatentVariable$() {
    return Observable.from([DUMMY])
  }
  get observedVariables$() {
    return Observable.from([DUMMY])
  }
  get latentVariables$() {
    return Observable.from([DUMMY])
  }
  get covariances$() {
    return Observable.from([DUMMY])
  }
  get intercepts$() {
    return Observable.from([DUMMY])
  }
  get latentVariableRelations$() {
    return Observable.from([DUMMY])
  }
  get regressions$() {
    return Observable.from([DUMMY])
  }
  get variables$() {
    return Observable.from([DUMMY])
  }
}
