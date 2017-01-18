import {Project} from './project'

describe('Project', () => {
  it('should create an instance', () => {
    const name = 'dummy'
    const rawData = [
      ['key1', 'key2'],
      ['10', '20'],
      ['11', '21'],
    ]
    expect(new Project(name, rawData)).toBeTruthy()
  })
})
