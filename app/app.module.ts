import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {TranslateModule, TranslateService} from 'ng2-translate'

import {LOCALE} from './constant'
import {ROUTING} from './app.routing'

import {AppComponent} from './app.component'
import {DashboardComponent} from './dashboard.component'
import {DetailComponent} from './detail.component'
import {ModalDialogComponent} from './modal-dialog.component'
import {ModalDialogLoadFileComponent} from './modal-dialog-load-file.component'
import {UiButtonComponent} from './ui-button.component'
import {InputFileDirective} from './input-file.directive'

import {WindowRef} from './window-ref.service'
import {PapaParseProvider} from './papa-parse.provider'
import {LovefieldProvider} from './lovefield.provider'
import {CsvToJsonAdapter} from './csv-to-json-adapter.service'
import {DatabaseAdapter} from './database.adapter'
import {ProjectsDatabaseAdapter} from './projects-database.adapter'
import {ProjectsRepository} from './projects.repository'
import {RouteChanger} from './route-changer.service'
import {AppActions} from './app.actions'
import {AppDispatcher} from './app.dispatcher'
import {AppStore} from './app.store'
import {ProjectsResolver} from './projects.resolver'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    ROUTING
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    ModalDialogComponent,
    ModalDialogLoadFileComponent,
    UiButtonComponent,
    InputFileDirective
  ],
  providers: [
    WindowRef,
    PapaParseProvider,
    LovefieldProvider,
    CsvToJsonAdapter,
    DatabaseAdapter,
    ProjectsDatabaseAdapter,
    ProjectsRepository,
    RouteChanger,
    AppActions,
    AppDispatcher,
    AppStore,
    {
      provide: ProjectsResolver,
      useClass: ProjectsResolver,
      deps: [AppStore]
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
