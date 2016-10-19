import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {TranslateModule, TranslateService} from 'ng2-translate'

import {LOCALE} from './constant'
import {ROUTING} from './app.routing'

import {AppComponent} from './components/app.component'
import {DashboardComponent} from './components/dashboard.component'
import {DetailComponent} from './components/detail.component'
import {VariablesComponent} from './components/variables.component'
import {ModalDialogComponent} from './components/modal-dialog.component'
import {ModalDialogLoadFileComponent} from './components/modal-dialog-load-file.component'
import {UiButtonComponent} from './components/ui-button.component'
import {InputFileDirective} from './directives/input-file.directive'

import {WindowRef} from './services/window-ref.service'
import {PapaParseProvider} from './services/papa-parse.provider'
import {LovefieldProvider} from './services/lovefield.provider'
import {CsvToJsonAdapter} from './services/csv-to-json-adapter.service'
import {DatabaseAdapter} from './services/database-adapter.service'
import {ProjectsStore} from './application/project/projects.store';
import {ProjectsDatabaseAdapter} from './services/projects-database-adapter.service'
import {ProjectsRepository} from './application/project/projects.repository'
import {ProjectVMFactory} from './application/project/project-vm-factory'
import {RouteChanger} from './services/route-changer.service'
import {AppActions} from './app.actions'
import {AppDispatcher} from './app.dispatcher'
import {AppStore} from './app.store'
import {ProjectsResolver} from './application/project/projects.resolver'

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
    VariablesComponent,
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
    ProjectsStore,
    ProjectsDatabaseAdapter,
    ProjectsRepository,
    ProjectVMFactory,
    RouteChanger,
    AppActions,
    AppDispatcher,
    AppStore,
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
