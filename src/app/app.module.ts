/* tslint:disable:max-line-length */

import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule, Http} from '@angular/http'
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
  TranslateStaticLoader
} from 'ng2-translate'

import {LOCALE} from './constant'
import {ROUTING} from './app-routing'

import {AppComponent} from './app.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {DetailComponent} from './components/detail/detail.component'
import {ModalDialogCreateCovarianceComponent} from './components/modal-dialog-create-covariance/modal-dialog-create-covariance.component'
import {ModalDialogCreateInterceptComponent} from './components/modal-dialog-create-intercept/modal-dialog-create-intercept.component'
import {ModalDialogCreateLatentVariableRelationComponent} from './components/modal-dialog-create-latent-variable-relation/modal-dialog-create-latent-variable-relation.component'
import {ModalDialogCreateRegressionComponent} from './components/modal-dialog-create-regression/modal-dialog-create-regression.component'
import {ModalDialogLatentVariableDetailComponent} from './components/modal-dialog-latent-variable-detail/modal-dialog-latent-variable-detail.component'
import {ModalDialogObservedVariableDetailComponent} from './components/modal-dialog-observed-variable-detail/modal-dialog-observed-variable-detail.component'
import {ModalDialogLoadFileComponent} from './components/modal-dialog-load-file/modal-dialog-load-file.component'
import {ModalDialogComponent} from './components/modal-dialog/modal-dialog.component'
import {ModelsComponent} from './components/models/models.component'
import {UiAddButtonComponent} from './components/ui-add-button/ui-add-button.component'
import {UiButtonComponent} from './components/ui-button/ui-button.component'
import {UiDeleteIconComponent} from './components/ui-delete-icon/ui-delete-icon.component'
import {UiInfoIconComponent} from './components/ui-info-icon/ui-info-icon.component'
import {VariablesComponent} from './components/variables/variables.component'
import {VizComponent} from './components/viz/viz.component'
import {InputFileDirective} from './directives/input-file.directive'

import {CsvToJsonAdapterService} from "./services/csv-to-json-adapter.service";
import {DatabaseAdapterService} from "./services/database-adapter.service";
import {LovefieldProviderService} from "./services/lovefield-provider.service";
import {PapaParseProviderService} from "./services/papa-parse-provider.service";
import {ProjectsDatabaseAdapterService} from "./services/projects-database-adapter.service";
import {RouteChangerService} from "./services/route-changer.service";
import {SemApiService} from "./services/sem-api.service";
import {WindowRefService} from "./services/window-ref.service";
import {AppActionsService} from "./app-actions.service";
import {AppDispatcherService} from "./app-dispatcher.service";
import {AppStoreService} from "./app-store.service";
import {ModalDialogActionsService} from "./application/modal-dialog/modal-dialog-actions.service";
import {ProjectsActionsService} from "./application/project/projects-actions.service";
import {ProjectsRepositoryService} from "./application/project/projects-repository.service";
import {ProjectsResolverService} from "./application/project/projects-resolver.service";
import {ProjectsStoreService} from "./application/project/projects-store.service";
import {ProjectVmFactoryService} from "./application/project/project-vm-factory.service";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    ModalDialogCreateCovarianceComponent,
    ModalDialogCreateInterceptComponent,
    ModalDialogCreateLatentVariableRelationComponent,
    ModalDialogCreateRegressionComponent,
    ModalDialogLatentVariableDetailComponent,
    ModalDialogObservedVariableDetailComponent,
    ModalDialogLoadFileComponent,
    ModalDialogComponent,
    ModelsComponent,
    UiAddButtonComponent,
    UiButtonComponent,
    UiDeleteIconComponent,
    UiInfoIconComponent,
    VariablesComponent,
    VizComponent,
    InputFileDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    ROUTING,
  ],
  providers: [
    CsvToJsonAdapterService,
    DatabaseAdapterService,
    LovefieldProviderService,
    PapaParseProviderService,
    ProjectsDatabaseAdapterService,
    RouteChangerService,
    SemApiService,
    WindowRefService,
    AppActionsService,
    AppDispatcherService,
    AppStoreService,
    ModalDialogActionsService,
    ProjectsActionsService,
    ProjectsRepositoryService,
    ProjectsResolverService,
    ProjectsStoreService,
    ProjectVmFactoryService,
    {
      provide: ProjectsResolverService,
      useClass: ProjectsResolverService,
      deps: [ProjectsStoreService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('ja')
    translate.use(LOCALE)
  }

}
