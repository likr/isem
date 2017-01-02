/* tslint:disable:max-line-length */

import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {TranslateModule, TranslateService} from 'ng2-translate'

import {LOCALE} from './constant'

import {AppComponent} from './app.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {DetailComponent} from './components/detail/detail.component'
import {ModalDialogCreateCovarianceComponent} from './components/modal-dialog-create-covariance/modal-dialog-create-covariance.component'
import {ModalDialogCreateInterceptComponent} from './components/modal-dialog-create-intercept/modal-dialog-create-intercept.component'
import {ModalDialogCreateLatentVariableComponent} from './components/modal-dialog-create-latent-variable/modal-dialog-create-latent-variable.component'
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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    ModalDialogCreateCovarianceComponent,
    ModalDialogCreateInterceptComponent,
    ModalDialogCreateLatentVariableComponent,
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
    TranslateModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('ja')
    translate.use(LOCALE)
  }

}
