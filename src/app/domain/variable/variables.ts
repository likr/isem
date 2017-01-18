import {Variable} from './variable'

export class Variables<T extends Variable> {

  protected list: T[]

  constructor(variables: T[]) {
    this.list = variables
  }

  findById(id: string): T {
    return this.list.find((v) => v.id === id)
  }

  merge(variables: Variables<Variable>): Variables<Variable> {
    const newList = (<Variable[]>this.list).concat(variables.toArray())
    return new Variables(newList)
  }

  toArray(): T[] {
    return this.list
  }

  getFromSpecificIds(ids: string[]): Variables<Variable> {
    return new Variables(ids.map((id) => this.findById(id)))
  }

  get allKeys(): string[] {
    return this.list.map((v) => v.key)
  }

  get allIds(): string[] {
    return this.list.map((v) => v.id)
  }

}
