/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogObservedVariableDetailComponent} from './modal-dialog-observed-variable-detail.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {UiButtonComponent} from '../ui-button/ui-button.component'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'
import {ProjectsStoreService} from '../../application/project/projects-store.service'
import {MockProjectsStoreService} from '../../mocks/application/project/mock-projects-store.service'

class MockModalDialogActionsService {}
class MockAppDispatcherService {}

describe('ModalDialogObservedVariableDetailComponent', () => {
  let component: ModalDialogObservedVariableDetailComponent
  let fixture: ComponentFixture<ModalDialogObservedVariableDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalDialogObservedVariableDetailComponent,
        MockTranslatePipe,
        UiButtonComponent,
      ],
      providers: [
        {provide: ModalDialogActionsService, useClass: MockModalDialogActionsService},
        {provide: AppDispatcherService, useClass: MockAppDispatcherService},
        {provide: ProjectsStoreService, useClass: MockProjectsStoreService},
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogObservedVariableDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
