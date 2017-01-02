/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModelsComponent} from './models.component'

describe('ModelsComponent', () => {
  let component: ModelsComponent
  let fixture: ComponentFixture<ModelsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
