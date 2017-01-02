/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {UiButtonComponent} from './ui-button.component'

describe('UiButtonComponent', () => {
  let component: UiButtonComponent
  let fixture: ComponentFixture<UiButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiButtonComponent ]
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
