/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'
import {FormsModule} from '@angular/forms'

import {ModalDialogLoadFileComponent} from './modal-dialog-load-file.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {InputFileDirective} from '../../directives/input-file.directive'
import {UiButtonComponent} from '../ui-button/ui-button.component'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'

class MockProjectsActionsService {}
class MockModalDialogActionsService {}
class MockAppDispatcherService {}

describe('ModalDialogLoadFileComponent', () => {
  let component: ModalDialogLoadFileComponent
  let fixture: ComponentFixture<ModalDialogLoadFileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        ModalDialogLoadFileComponent,
        MockTranslatePipe,
        InputFileDirective,
        UiButtonComponent,
      ],
      providers: [
        {provide: ProjectsActionsService, useClass: MockProjectsActionsService},
        {provide: ModalDialogActionsService, useClass: MockModalDialogActionsService},
        {provide: AppDispatcherService, useClass: MockAppDispatcherService},
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogLoadFileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
