import {Component, Input} from '@angular/core'

import {AbstractComponent} from './'
import {ObservedVariableVM, LatentVariableVM} from '../application/variable'
import {AppActions, AppDispatcher} from '../application/app'

@Component({
  selector: 'is-variables',
  template: `
    <ul>
      <li *ngFor="let variable of observedVariables">
        {{variable.key}}
      </li>
    </ul>
    <button (click)="onClickAddLatentVariable()">潜在変数を追加</button>
    <ul>
      <li *ngFor="let variable of latentVariables">
        {{variable.key}}
      </li>
    </ul>
  `
})
export class VariablesComponent extends AbstractComponent {

  @Input() observedVariables: ObservedVariableVM[]
  @Input() latentVariables: LatentVariableVM[]

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {
    super()
  }

  onClickAddLatentVariable() {
    this.dispatcher.emit(this.actions.addLatentVariable())
  }

}
