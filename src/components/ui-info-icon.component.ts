import {Component} from '@angular/core'

import {AbstractComponent} from './abstract'

@ Component({
  selector: 'is-ui-info-icon',
  template: `
    <style>
      svg {
        position: relative;
        top: 1px;
      }
    </style>
    <svg class="icon icon-info"><use xlink:href="#icon-info"></use></svg>
  `
})
export class UiInfoIconComponent extends AbstractComponent {

  constructor() {
    super()
  }

}
