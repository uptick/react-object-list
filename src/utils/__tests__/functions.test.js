import {getVisibleColumns, sortByName} from '../functions'

describe('Filters visible columns', () => {
  const notOptional = {dataKey: 'a', optional: false, label: 'a', fieldKey: 'a'}
  const isOptional = {dataKey: 'b', optional: true, label: 'b', fieldKey: 'b'}

  it('handles simple array', () => {
    const columns = [notOptional, isOptional]
    expect(getVisibleColumns(columns, [])).toEqual([notOptional])
    expect(getVisibleColumns(columns, ['a', 'b'])).toEqual(columns)
  })
  it('handles nested array', () => {
    const columns = [[notOptional, isOptional]]
    expect(getVisibleColumns(columns, [])).toEqual([[{...notOptional, label: 'a', fieldKey: 'a'}]])
    expect(getVisibleColumns(columns, ['a', 'b'])).toEqual(columns)
  })
  it('handles empty nested array', () => {
    const columns = [[notOptional, isOptional], []]
    expect(getVisibleColumns(columns, [])).toEqual([[notOptional]])
    expect(getVisibleColumns(columns, ['a', 'b'])).toEqual([columns[0]])
  })
  it('handles mixed array', () => {
    const nestedOptional = {...isOptional, dataKey: 'c', fieldKey: 'c', label: 'c'}
    const nestedNotOptional = {...notOptional, dataKey: 'd', fieldKey: 'd', label: 'd'}
    const columns = [notOptional, isOptional, [nestedOptional, nestedNotOptional]]
    expect(getVisibleColumns(columns, [])).toEqual([notOptional, [nestedNotOptional]])
    expect(getVisibleColumns(columns, ['a', 'c'])).toEqual([notOptional, [nestedOptional, nestedNotOptional]])
    expect(getVisibleColumns(columns, ['c', 'b'])).toEqual(columns)
  })
})

describe('Sorts by name', () => {
  it('sorts alphabetically', () => {
    expect(sortByName(
      {name: 'abc'}, {name: 'def'}
    )).toBe(-1)
    expect(sortByName(
      {name: 'def'}, {name: 'abc'}
    )).toBe(1)
  })
  it('handles equality', () => {
    expect(sortByName(
      {name: 'abc'}, {name: 'abc'}
    )).toBe(0)
  })
  it('ignores case', () => {
    expect(sortByName(
      {name: 'Abc'}, {name: 'dEF'}
    )).toBe(-1)
    expect(sortByName(
      {name: 'DeF'}, {name: 'abc'}
    )).toBe(1)
    expect(sortByName(
      {name: 'abc'}, {name: 'ABC'}
    )).toBe(0)
  })
})
