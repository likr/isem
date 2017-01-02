import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'

@Component({
  selector: 'is-ui-info-icon',
  templateUrl: './ui-info-icon.component.html',
  styleUrls: ['./ui-info-icon.component.css']
})
export class UiInfoIconComponent extends AbstractComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
