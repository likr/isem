export class Model {

  model: {
    covariance?: {[key: string]: string[]}
  }

  constructor() {
    this.model = {
      covariance: {}
    }
  }

  addCovariance(variable1key: string, variable2key: string) {
    this.model.covariance[variable1key] = this.model.covariance[variable1key] || []
    this.model.covariance[variable1key].push(variable2key)
  }

}
