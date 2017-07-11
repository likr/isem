import * as jQuery from 'jquery'

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {enableProdMode} from '@angular/core'
import {environment} from './environments/environment'
import {AppModule} from './app/app.module'

(window as any).jQuery = jQuery
require('./assets/semantic/semantic.js')

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
