/* tslint:disable */
declare const require: any
const uuid = require('uuid')
/* tslint:enable */

export const uuidGen = () => {
  return uuid.v4()
}
