import { getValueFromAccessor, handleRowClick } from '../functions'

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
  it('returns null for incorrect key', () => {
    expect(getValueFromAccessor({a: {b: 'c'}}, 'a.c')).toBe(null)
  })
})

describe('handle row click', () => {
  const currentTarget = {}
  const testTarget = (target, shouldTrigger = false) => {
    const itemOnClick = jasmine.createSpy()
    const row = {}
    const mockEvent = {
      currentTarget,
      target,
      persist: jasmine.createSpy(),
      preventDefault: jasmine.createSpy(),
      stopPropagation: jasmine.createSpy(),
    }
    handleRowClick(mockEvent, row, itemOnClick)
    expect(mockEvent.persist).toHaveBeenCalled()
    if (shouldTrigger) {
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(mockEvent.stopPropagation).toHaveBeenCalled()
      expect(itemOnClick).toHaveBeenCalledWith(row)
    } else {
      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
      expect(mockEvent.stopPropagation).not.toHaveBeenCalled()
      expect(itemOnClick).not.toHaveBeenCalled()
    }
  }
  it('handles clicking on row', () => {
    const target = {
      parentElement: currentTarget,
      tagName: 'TD',
    }
    testTarget(target, true)
  })
  it('handles clicking on a link in a row', () => {
    const target = {
      parentElement: currentTarget,
      tagName: 'A',
    }
    testTarget(target)
  })
  it('handles clicking on a button in a row', () => {
    const target = {
      parentElement: currentTarget,
      tagName: 'BUTTON',
    }
    testTarget(target)
  })
  it('handles clicking on an input in a row', () => {
    const target = {
      parentElement: currentTarget,
      tagName: 'INPUT',
    }
    testTarget(target)
  })
  it('handles clicking on a textarea in a row', () => {
    const target = {
      parentElement: currentTarget,
      tagName: 'TEXTAREA',
    }
    testTarget(target)
  })
})
