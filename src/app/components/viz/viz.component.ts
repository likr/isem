import {Component, OnInit} from '@angular/core'

import {AbstractComponent} from '../abstract/abstract.component'

@Component({
  selector: 'is-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.css']
})
export class VizComponent extends AbstractComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
