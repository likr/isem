import {AppActions} from './app.actions'
import {AppDispatcher} from './app.dispatcher'
import {AppStore} from './app.store'

export {AppActions} from './app.actions'
export {AppDispatcher} from './app.dispatcher'
export {AppStore} from './app.store'
export {ROUTING} from './app.routing'

export const providers = [
  AppActions,
  AppDispatcher,
  AppStore,
]
