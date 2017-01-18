/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {Observable} from 'rxjs'

import {ModalDialogLatentVariableDetailComponent} from './modal-dialog-latent-variable-detail.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {UiButtonComponent} from '../ui-button/ui-button.component'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {MockProjectsStoreService} from '../../mocks/application/project/mock-projects-store.service'

class MockModalDialogActionsService {}
class MockProjectsActionsService {}
class MockAppDispatcherService {}

describe('ModalDialogLatentVariableDetailComponent', () => {
  let component: ModalDialogLatentVariableDetailComponent
  let fixture: ComponentFixture<ModalDialogLatentVariableDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        ModalDialogLatentVariableDetailComponent,
        MockTranslatePipe,
        UiButtonComponent,
      ],
      providers: [
        {provide: ModalDialogActionsService, useClass: MockModalDialogActionsService},
        {provide: ProjectsActionsService, useClass: MockProjectsActionsService},
        {provide: AppDispatcherService, useClass: MockAppDispatcherService},
        {provide: ProjectsStoreService, useClass: MockProjectsStoreService},
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogLatentVariableDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
