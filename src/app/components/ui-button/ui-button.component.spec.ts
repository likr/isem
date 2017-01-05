/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {UiButtonComponent} from './ui-button.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'
import {AppActionsService} from '../../app-actions.service'
import {AppDispatcherService} from '../../app-dispatcher.service'

class MockAppActionsService {}
class MockAppDispatcherService {}

describe('UiButtonComponent', () => {
  let component: UiButtonComponent
  let fixture: ComponentFixture<UiButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UiButtonComponent,
        MockTranslatePipe
      ],
      providers: [
        {provide: AppActionsService, useClass: MockAppActionsService},
        {provide: AppDispatcherService, useClass: MockAppDispatcherService},
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UiButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
