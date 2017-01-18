/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {UiInfoIconComponent} from './ui-info-icon.component'

describe('UiInfoIconComponent', () => {
  let component: UiInfoIconComponent
  let fixture: ComponentFixture<UiInfoIconComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiInfoIconComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UiInfoIconComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
