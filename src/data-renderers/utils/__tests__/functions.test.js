import { getValueFromAccessor } from '../functions'

describe('getValueFromAccessor', () => {
  it('returns value for a simple key/row', () => {
    expect(getValueFromAccessor({a: 'b'}, ['a'])).toBe('b')
  })
  it('returns value for a nested row/mutiple keys', () => {
    expect(getValueFromAccessor({a: {b: 'c'}}, ['a', 'b'])).toBe('c')
  })
  it('returns value for a nested row/dotted key', () => {
    expect(getValueFromAccessor({a: {b: 'c'}}, 'a.b')).toBe('c')
  })
})
