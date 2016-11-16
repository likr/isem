import {Component} from '@angular/core'

import {AbstractComponent} from './abstract'

@ Component({
  selector: 'is-ui-add-button',
  template: `
    <style>
      button {
        background: #455A64;
        border: none;
        color: white;
        border-radius: 12px;
        font-size: 0.7em;
        padding: 4px 8px;
        cursor: pointer;
      }
    </style>
    <button>{{'Add' | translate}}</button>
  `
})
export class UiAddButtonComponent extends AbstractComponent {

  constructor() {
    super()
  }

}
