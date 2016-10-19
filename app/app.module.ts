import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {TranslateModule, TranslateService} from 'ng2-translate'

import {LOCALE} from './constant'
import {ROUTING} from './application/main'

import {declarations as components, AppComponent} from './components'
import {declarations as directives} from './directives'

import {providers as services} from './services'
import {providers as application} from './application'
import {ProjectsResolver, ProjectsStore} from './application/project'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    ROUTING
  ],
  declarations: [
    components,
    directives
  ],
  providers: [
    services,
    application,
    {
      provide: ProjectsResolver,
      useClass: ProjectsResolver,
      deps: [ProjectsStore]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('ja')
    translate.use(LOCALE)
  }

}
