/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {VariablesComponent} from './variables.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {UiAddButtonComponent} from '../ui-add-button/ui-add-button.component'
import {UiInfoIconComponent} from '../ui-info-icon/ui-info-icon.component'
import {ProjectsActionsService} from '../../application/project/projects-actions.service'
import {ModalDialogActionsService} from '../../application/modal-dialog/modal-dialog-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'

class MockProjectsActionsService {}
class MockModalDialogActionsService {}
class MockAppDispatcherService {}

describe('VariablesComponent', () => {
  let component: VariablesComponent
  let fixture: ComponentFixture<VariablesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VariablesComponent,
        MockTranslatePipe,
        UiAddButtonComponent,
        UiInfoIconComponent,
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
    fixture = TestBed.createComponent(VariablesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
