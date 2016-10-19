import {Component, Input, Output, EventEmitter} from '@angular/core'

import {AppActions, AppDispatcher} from '../application/main'

@Component({
  selector: 'is-ui-button',
  template: `
    <style>
      span {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
      }
      
      .default {
        color: #333;
        background-color: #fff;
        border-color: #ccc;
      }
      .default:hover {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
      }
      .default:active {
        color: #333;
        background-color: #d4d4d4;
        border-color: #8c8c8c;
      }

      .primary {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
      }
      .primary:hover {
        color: #fff;
        background-color: #286090;
        border-color: #204d74;
      }
      .primary:active {
        color: #fff;
        background-color: #204d74;
        border-color: #122b40;
      }
    </style>
    <span
      role="button"
      [class.default]="type === 'default'"
      [class.primary]="type === 'primary'"
      (click)="onClick($event)"
    >{{label}}</span>
  `
})
export class UiButtonComponent {

  @Input() label: string
  @Input() type: string
  @Output() clickButton = new EventEmitter<MouseEvent>()

  constructor(private actions: AppActions,
              private dispatcher: AppDispatcher) {}

  ngOnInit() {
    this.dispatcher.emit(this.actions.setCurrentView('dashboard'))
  }

  onClick(ev: MouseEvent) {
    this.clickButton.emit(ev)
  }

}
