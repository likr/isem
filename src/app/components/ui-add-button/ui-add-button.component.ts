import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'

@Component({
  selector: 'is-ui-add-button',
  templateUrl: './ui-add-button.component.html',
  styleUrls: ['./ui-add-button.component.css']
})
export class UiAddButtonComponent extends AbstractComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
