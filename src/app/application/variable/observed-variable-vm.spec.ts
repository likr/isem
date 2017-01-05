import {ObservedVariableVm} from './observed-variable-vm'
import {ObservedVariable} from '../../domain/variable/observed-variable'

describe('ObservedVariableVm', () => {
  it('should create an instance', () => {
    const dummy = new ObservedVariable('key', ['1', '2'])
    expect(new ObservedVariableVm(dummy)).toBeTruthy()
  })
})
