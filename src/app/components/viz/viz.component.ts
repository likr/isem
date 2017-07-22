import {Component, Input} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'
import {VariableVm} from '../../application/variable/variable-vm'

@Component({
  selector: 'is-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.css']
})
export class VizComponent extends AbstractComponent {
  @Input() json: any
  @Input() graph: any
  @Input() observedVariables: VariableVm[]
  @Input() latentVariables: VariableVm[]
  standardized = true

}
