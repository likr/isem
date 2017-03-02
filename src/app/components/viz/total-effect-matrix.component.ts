import {Component, Input} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'
import {getEstimateKeyName} from './estimate-key-name'

@Component({
  selector: 'is-total-effect-matrix',
  templateUrl: './total-effect-matrix.component.html',
  styleUrls: ['./total-effect-matrix.component.css']
})
export class TotalEffectMatrixComponent extends AbstractComponent {
  @Input() json: any
  @Input() standardized: boolean
  data = {
    matrix: {},
    names: []
  }

  ngOnChanges() {
    const {total_effects, names} = this.json

    if (names) {
      this.data = {
        matrix: total_effects[getEstimateKeyName(this.standardized)],
        names: names.lat.concat(names.obs)
      }
    }
  }
}
