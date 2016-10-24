import {Injectable} from '@angular/core'
import {Dispatcher} from 'walts'

import {AppState} from './app.state'

@Injectable()
export class AppDispatcher extends Dispatcher<AppState> {
}
