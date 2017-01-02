/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {DebugElement} from '@angular/core'

import {ModalDialogComponent} from './modal-dialog.component'

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent
  let fixture: ComponentFixture<ModalDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
