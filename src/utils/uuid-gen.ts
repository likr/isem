/* tslint:disable */
declare var require: any
const uuid = require('uuid')
/* tslint:enable */

export const uuidGen = () => {
  return uuid.v4()
}
