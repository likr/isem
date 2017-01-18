import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

const DUMMY = ['dummy']

@Injectable()
export class MockAppStoreService {
  observable = Observable.from([DUMMY])

  get modalDialogIsVisible$() {
    return Observable.from([DUMMY])
  }
  get modalDialogType$() {
    return Observable.from([DUMMY])
  }
  get data$() {
    return Observable.from([DUMMY])
  }
}
