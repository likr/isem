import {LatentVariableVm} from './latent-variable-vm'
import {LatentVariable} from '../../domain/variable/latent-variable'

describe('LatentVariableVm', () => {
  it('should create an instance', () => {
    const dummy = new LatentVariable('key')
    expect(new LatentVariableVm(dummy)).toBeTruthy()
  })
})
