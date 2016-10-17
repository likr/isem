import {uuidGen} from '../../utils/uuid-gen'
import {ObservedVariables} from '../variable/observed-variables'

export class Project {

  private _uuid:              string
  private _created:           number
  private _modified:          number
  private _models:            Object
  private _observedVariables: ObservedVariables

  static fromBackend(v: any): Project {
    const p = new Project(v.name, [[]])
    p._uuid              = v.uuid
    p._created           = v.created
    p._modified          = v.modified
    p._models            = v.models
    p._observedVariables = ObservedVariables.fromBackend(v.observedVariables)
    return p
  }

  constructor(private _name: string,
              rawData: any[][]) {
    this._uuid = uuidGen()

    const now = Date.now() / 1000 | 0
    this._created  = now
    this._modified = now

    this._models            = {}
    this._observedVariables = new ObservedVariables(rawData)
  }

  get name():              string            { return this._name }
  get uuid():              string            { return this._uuid }
  get created():           number            { return this._created }
  get modified():          number            { return this._modified }
  get models():            Object            { return this._models }
  get observedVariables(): ObservedVariables { return this._observedVariables }

}
