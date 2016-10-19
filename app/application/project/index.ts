import {ProjectsRepository} from './projects.repository'
import {ProjectsResolver} from './projects.resolver'
import {ProjectsStore} from './projects.store'
import {ProjectVMFactory} from './project-vm-factory'

export {ProjectsRepository} from './projects.repository'
export {ProjectsResolver} from './projects.resolver'
export {ProjectsStore} from './projects.store'
export {ProjectVMFactory} from './project-vm-factory'
export {ProjectVM} from './project-vm'

export const providers = [
  ProjectsRepository,
  ProjectsResolver,
  ProjectsStore,
  ProjectVMFactory,
]
