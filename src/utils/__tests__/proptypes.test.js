import {SELECTION_TYPE} from '../proptypes'

describe('custom proptypes', () => {
  it('correctly detects seletion proptype', () => {
    const selection = {
      1: true,
      2: true,
      3: false,
    }

    expect(SELECTION_TYPE({selection}, 'selection', 'ComponentName')).toBe(undefined)
  })
  it('handles invalid selection props', () => {
    const selection = [1, 2, 3]
    expect(SELECTION_TYPE({selection}, 'selection', 'ComponentName')).toEqual(expect.any(Error))
  })
})
