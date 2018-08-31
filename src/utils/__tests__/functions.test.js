import {getVisibleColumns, sortByName, getLeafColumns, _getTreeDepth} from '../functions'

describe('Filters visible columns', () => {
  const dataKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const generateOptional = dataKey => ({dataKey, optional: true, label: dataKey, fieldKey: dataKey})
  const generateNotOptional = dataKey => ({dataKey, optional: false, label: dataKey, fieldKey: dataKey})

  const notOptional = generateNotOptional(dataKeys.shift())
  const isOptional = generateOptional(dataKeys.shift())
  const nestedOptional = generateOptional(dataKeys.shift())
  const nestedNotOptional = generateNotOptional(dataKeys.shift())

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
    const columns = [notOptional, isOptional, [nestedOptional, nestedNotOptional]]
    expect(getVisibleColumns(columns, [])).toEqual([notOptional, [nestedNotOptional]])
    expect(getVisibleColumns(columns, ['a', 'c'])).toEqual([notOptional, [nestedOptional, nestedNotOptional]])
    expect(getVisibleColumns(columns, ['c', 'b'])).toEqual(columns)
  })
  it('handles grouped columns', () => {
    const columns = [
      {
        header: '🌿', fieldKey: '🌿', columns: [notOptional, isOptional],
      },
      {
        header: '🐂',
        fieldKey: '🐂',
        columns: [{
          header: '🐅',
          fieldKey: '🐅',
          columns: [nestedNotOptional],
        }],
      },
    ]

    expect(getVisibleColumns(columns)).toEqual([
      {
        header: '🌿', fieldKey: '🌿', columns: [notOptional],
      }, {
        header: '🐂',
        fieldKey: '🐂',
        columns: [{
          header: '🐅',
          fieldKey: '🐅',
          columns: [nestedNotOptional],
        }],
      },
    ])
    expect(getVisibleColumns(columns, ['b'])).toEqual(columns)
  })
})

describe('Run tree traversal functions', () => {
  const leaves = ['⛵', '🌀', '🎎', '👾', '👣', '👞', '💣', '🖖', '💬'].map(dataKey => ({dataKey, label: dataKey, fieldKey: dataKey}))
  const unabalancedTree = [
    {header: 'a', columns: [leaves[0]]},
    {header: 'b', columns: [{header: 'c', columns: [{header: 'd', columns: [leaves[1]]}, leaves[2]]}]},
    leaves[3],
    leaves[4],
  ]
  const balancedTree = [
    {header: 'a', columns: [leaves[0]]},
    {header: 'b', columns: [leaves[2], leaves[3]]},
    {header: 'c', columns: [[leaves[4], leaves[5]]]},
    {header: 'd', columns: [leaves[6]]},
    {header: 'e', columns: [leaves[7]]},
  ]

  describe('Extracts leaf columns', () => {
    it('grabs leaves from a flat tree structure', () => {
      expect(getLeafColumns(leaves)).toEqual(leaves)
    })
    it('grabs leaves from an unabalanced tree', () => {
      expect(getLeafColumns(unabalancedTree)).toEqual(leaves.slice(0, 5))
    })
  })

  describe('Calculate tree depth', () => {
    it('works for base case', () => {
      expect(_getTreeDepth([])).toBe(0)
    })
    it('works for a flat tree', () => {
      expect(_getTreeDepth(leaves)).toBe(1)
    })
    it('works for an inbalanced tree', () => {
      expect(_getTreeDepth(unabalancedTree)).toBe(4)
    })
    it('works for a balanced tree', () => {
      expect(_getTreeDepth(balancedTree)).toBe(2)
    })
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
