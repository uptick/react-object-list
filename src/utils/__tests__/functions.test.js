import {getVisibleColumns} from '../functions'

describe('Filters visible columns', () => {
  const notOptional = {dataKey: 'a', optional: false}
  const isOptional = {dataKey: 'b', optional: true}
  it('handles simple array', () => {
    const columns = [notOptional, isOptional]
    expect(getVisibleColumns(columns, [])).toEqual([notOptional])
    expect(getVisibleColumns(columns, ['a', 'b'])).toEqual(columns)
  })
  it('handles nested array', () => {
    const columns = [[notOptional, isOptional]]
    expect(getVisibleColumns(columns, [])).toEqual([[notOptional]])
    expect(getVisibleColumns(columns, ['a', 'b'])).toEqual(columns)
  })
  it('handles mixed array', () => {
    const nestedOptional = {...isOptional, dataKey: 'c'}
    const nestedNotOptional = {...notOptional, dataKey: 'd'}
    const columns = [notOptional, isOptional, [nestedOptional, nestedNotOptional]]
    expect(getVisibleColumns(columns, [])).toEqual([notOptional, [nestedNotOptional]])
    expect(getVisibleColumns(columns, ['a', 'c'])).toEqual([notOptional, [nestedOptional, nestedNotOptional]])
    expect(getVisibleColumns(columns, ['c', 'b'])).toEqual(columns)
  })
})
