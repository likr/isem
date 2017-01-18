import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'

@Component({
  selector: 'is-ui-delete-icon',
  templateUrl: './ui-delete-icon.component.html',
  styleUrls: ['./ui-delete-icon.component.css']
})
export class UiDeleteIconComponent extends AbstractComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
