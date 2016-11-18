import {Component} from '@angular/core'

import {AbstractComponent} from './abstract'

@ Component({
  selector: 'is-ui-delete-icon',
  template: `
    <style>
      svg {
        position: relative;
        top: 1px;
      }
    </style>
    <svg class="icon icon-cancel-circle"><use xlink:href="#icon-cancel-circle"></use></svg>
  `
})
export class UiDeleteIconComponent extends AbstractComponent {

  constructor() {
    super()
  }

}
