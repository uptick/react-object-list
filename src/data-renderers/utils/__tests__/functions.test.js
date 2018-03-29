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
  it('returns value up to point for incorrect key', () => {
    expect(getValueFromAccessor({a: {b: 'c'}}, 'a.c')).toEqual({b: 'c'})
  })
  it('returns value without repetitive weirdness for incorrect key', () => {
    expect(getValueFromAccessor({a: {b: 'c'}}, 'a.c.b')).toEqual({b: 'c'})
  })
})
