/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {VariablesComponent} from './variables.component'

describe('VariablesComponent', () => {
  let component: VariablesComponent
  let fixture: ComponentFixture<VariablesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariablesComponent ]
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
