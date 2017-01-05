/* tslint:disable:no-unused-variable, max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'
import {FormsModule} from '@angular/forms'

import {ModalDialogComponent} from './modal-dialog.component'
import {ModalDialogLoadFileComponent} from '../modal-dialog-load-file/modal-dialog-load-file.component'
import {ModalDialogObservedVariableDetailComponent} from '../modal-dialog-observed-variable-detail/modal-dialog-observed-variable-detail.component'
import {ModalDialogLatentVariableDetailComponent} from '../modal-dialog-latent-variable-detail/modal-dialog-latent-variable-detail.component'
import {ModalDialogCreateRegressionComponent} from '../modal-dialog-create-regression/modal-dialog-create-regression.component'
import {ModalDialogCreateLatentVariableRelationComponent} from '../modal-dialog-create-latent-variable-relation/modal-dialog-create-latent-variable-relation.component'
import {ModalDialogCreateCovarianceComponent} from '../modal-dialog-create-covariance/modal-dialog-create-covariance.component'
import {ModalDialogCreateInterceptComponent} from '../modal-dialog-create-intercept/modal-dialog-create-intercept.component'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {WindowRefService} from '../../services/window-ref.service'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {InputFileDirective} from '../../directives/input-file.directive'
import {UiButtonComponent} from '../ui-button/ui-button.component'

class MockModalDialogActionsService {}
class MockAppDispatcherService {}

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent
  let fixture: ComponentFixture<ModalDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        ModalDialogComponent,
        ModalDialogLoadFileComponent,
        ModalDialogObservedVariableDetailComponent,
        ModalDialogLatentVariableDetailComponent,
        ModalDialogCreateRegressionComponent,
        ModalDialogCreateLatentVariableRelationComponent,
        ModalDialogCreateCovarianceComponent,
        ModalDialogCreateInterceptComponent,
        MockTranslatePipe,
        InputFileDirective,
        UiButtonComponent,
      ],
      providers: [
        {provide: ModalDialogActionsService, useClass: MockModalDialogActionsService},
        {provide: AppDispatcherService, useClass: MockAppDispatcherService},
        WindowRefService,
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
