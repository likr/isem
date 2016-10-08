declare var require: any
const uuid = require('uuid')

export const uuidGen = () => {
  return uuid.v4()
}