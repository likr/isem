import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'

@Component({
  selector: 'is-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.css']
})
export class UiButtonComponent extends AbstractComponent implements OnInit {

  @Input() label: string
  @Input() type: string
  @Output() clickButton = new EventEmitter<MouseEvent>()

  constructor() {
    super()
  }

  ngOnInit() {}

  onClick(ev: MouseEvent) {
    this.clickButton.emit(ev)
  }

}
