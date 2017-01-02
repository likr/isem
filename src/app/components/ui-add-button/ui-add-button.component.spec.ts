/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {UiAddButtonComponent} from './ui-add-button.component'

describe('UiAddButtonComponent', () => {
  let component: UiAddButtonComponent
  let fixture: ComponentFixture<UiAddButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiAddButtonComponent ]
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
