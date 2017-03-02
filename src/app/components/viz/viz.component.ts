import {Component, Input} from '@angular/core'
import {AbstractComponent} from '../abstract/abstract.component'
import {VariableVm} from '../../application/variable/variable-vm'

const uuidToName = (rawJson: any, observedVariables: VariableVm[], latentVariables: VariableVm[]) => {
  if (!rawJson || rawJson.names === undefined) {
    return {} // namesがなければAPIとの通信を行っていないとみなす
  }

  let result = JSON.parse(JSON.stringify(rawJson)) // deep copy
  const variables = latentVariables.concat(observedVariables)

  for (const varName of ['covariances', 'regressions', 'latent_variables']) {
    for (const k of Object.keys(result[varName])) {
      let var1 = variables.find((v) => v.id === k)
      result[varName][var1.key] = result[varName][k]
      delete result[varName][k]

      for (const k2 of Object.keys(result[varName][var1.key])) {
        let var2 = variables.find((v) => v.id === result[varName][var1.key][k2].name)
        result[varName][var1.key][k2].name = var2.key
      }
    }
  }

  for (const varName of ['lat', 'obs']) {
    for (const k of Object.keys(result.names[varName])) {
      let variable = variables.find((v) => v.id === result.names[varName][k])
      result.names[varName][k] = variable.key
    }
  }

  for (const k of Object.keys(result.variances)) {
    let variable = variables.find((v) => v.id === k)
    result.variances[variable.key] = result.variances[k]
    delete result.variances[k]
  }

  for (const estimateKeyName of Object.keys(result.total_effects)) {
    for (const k of Object.keys(result.total_effects[estimateKeyName])) {
      let var1 = variables.find((v) => v.id === k)
      result.total_effects[estimateKeyName][var1.key] = result.total_effects[estimateKeyName][k]
      delete result.total_effects[estimateKeyName][k]

      for (const k2 of Object.keys(result.total_effects[estimateKeyName][var1.key])) {
        let var2 = variables.find((v) => v.id === k2)
        result.total_effects[estimateKeyName][var1.key][var2.key] = result.total_effects[estimateKeyName][var1.key][k2]
        delete result.total_effects[estimateKeyName][var1.key][k2]
      }
    }
  }

  return result
}

@Component({
  selector: 'is-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.css']
})
export class VizComponent extends AbstractComponent {
  @Input() data: any
  @Input() observedVariables: VariableVm[]
  @Input() latentVariables: VariableVm[]
  standardized: boolean
  json: any

  constructor() {
    super()
    this.standardized = true
  }

  ngOnChanges() {
    this.json = uuidToName(this.data, this.observedVariables, this.latentVariables)
  }

}
