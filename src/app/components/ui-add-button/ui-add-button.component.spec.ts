/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {UiAddButtonComponent} from './ui-add-button.component'
import {MockTranslatePipe} from '../../mocks/pipes/mock-translate.pipe'

describe('UiAddButtonComponent', () => {
  let component: UiAddButtonComponent
  let fixture: ComponentFixture<UiAddButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UiAddButtonComponent,
        MockTranslatePipe,
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UiAddButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
