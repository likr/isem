/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {UiDeleteIconComponent} from './ui-delete-icon.component'

describe('UiDeleteIconComponent', () => {
  let component: UiDeleteIconComponent
  let fixture: ComponentFixture<UiDeleteIconComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiDeleteIconComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDeleteIconComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
