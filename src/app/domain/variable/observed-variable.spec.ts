import {ObservedVariable} from './observed-variable'

describe('ObservedVariable', () => {
  it('should create an instance', () => {
    const key = 'dummy'
    const values = ['1,23', '45']
    expect(new ObservedVariable(key, values)).toBeTruthy()
  })
})
