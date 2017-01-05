import {ProjectVm} from './project-vm'
import {Project} from '../../domain/project/project'
import {ModelVm} from '../model/model-vm'
import {ObservedVariableVm} from '../variable/observed-variable-vm'
import {LatentVariableVm} from '../variable/latent-variable-vm'
import {Model} from '../../domain/model/model'
import {Variables} from '../../domain/variable/variables'
import {Variable} from '../../domain/variable/variable'
import {ObservedVariable} from '../../domain/variable/observed-variable'
import {LatentVariable} from '../../domain/variable/latent-variable'

describe('ProjectVm', () => {
  it('should create an instance', () => {
    expect(new ProjectVm(
      new Project('name', [[]]),
      new ModelVm(new Model(), new Variables([new Variable('key')])),
      [new ObservedVariableVm(new ObservedVariable('key', ['1', '2']))],
      [new LatentVariableVm(new LatentVariable('key'))],
      'locale',
    )).toBeTruthy()
  })
})
