import {ModelVm} from './model-vm'
import {Model} from '../../domain/model/model'
import {Variables} from '../../domain/variable/variables'
import {Variable} from '../../domain/variable/variable'

describe('ModelVm', () => {
  it('should create an instance', () => {
    const model = new Model()
    const variables = new Variables([new Variable('key')])
    expect(new ModelVm(model, variables)).toBeTruthy()
  })
})
