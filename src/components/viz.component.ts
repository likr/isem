import {Component, Input} from '@angular/core'

import {AbstractComponent} from './abstract'
import {css as appCss} from './app.component'

/* tslint:disable */
declare var require: any
const ReactDOM = require('react-dom')
const React    = require('react')
const Sem      = require('sem').default
/* tslint:enable */

@Component({
  selector: 'is-viz',
  template: `
    <style>
      :host {
        display: block;
        margin: 0;
        flex: 1;
        height: 100%;
        padding: ${appCss.padding};
        overflow-y: scroll;
        border-right: 1px solid #90a4ae;
      }
      h2 {
        display: flex;
        margin: 8px 0;
        font-size: 14px;
        color: #455A64;
        margin-bottom: 4px;
      }
      li {
        display: flex;
        line-height: 26px;
      }
      .label {
        margin-right: auto;
      }
    </style>

    <div id='viz'></div>
  `
})

export class VizComponent extends AbstractComponent {

  @Input() data: any

  ngOnChanges() {
    ReactDOM.render(React.createElement(Sem, {json: this.data}, null), document.getElementById('viz'))
  }

}
