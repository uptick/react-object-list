/**
 * Filters columns by those in extraColumns to get the visible or optional fields
 * @param  {object[]} columns      Array of columns or arrays of columns
 * @param  {string[]} extraColumns Array of keys of columns currently visible
 * @param  {bool} optional         The value optional is set to in the particular column
 * @return {object[]}              Returns only those columns which are visible
 */
const getVisibleColumns = (columns, extraColumns = [], optional = false) => {
  return setColumnLabels(columns).reduce((acc, column) => {
    if (column.hasOwnProperty('columns')) {
      const visible = column.optional !== undefined && _checkVisibilityHelper(column, extraColumns, optional)
      if (column.optional === undefined || visible) {
        const columns = getVisibleColumns(column.columns, extraColumns, optional)
        if (columns.length || visible) {
          acc.push({...column, columns})
        }
      }
    } else if (Array.isArray(column)) {
      const columns = column.filter(leafColumn => _checkVisibilityHelper(leafColumn, extraColumns, optional))
      if (columns.length) {
        acc.push(columns)
      }
    } else if (_checkVisibilityHelper(column, extraColumns, optional)) {
      acc.push(column)
    }
    return acc
  }, [])
}

const _checkVisibilityHelper = (column, extraColumns, optional) => {
  return !!column.optional === optional ||
  extraColumns.includes(column.fieldKey)
}

/** get all the leaves of a balanced tree */
const getLeafColumns = (columns) => {
  return columns.reduce((acc, column) => {
    if (column.hasOwnProperty('columns')) {
      return acc.concat(getLeafColumns(column.columns))
    }
    acc.push(column)
    return acc
  }, [])
}

const annotateSpans = columns => {
  const depth = _getTreeDepth(columns)
  _annotateColumnSpan(columns, depth + 1)
}

/** depth first search annotating each column with a _colSpan or _rowSpan as appropriate */
const _annotateColumnSpan = (columns, depth) => {
  let sum = 0
  columns.forEach(column => {
    if (!column.hasOwnProperty('columns')) {
      column._colSpan = 1
      column._rowSpan = depth
    } else {
      column._colSpan = _annotateColumnSpan(column.columns, depth - 1)
    }
    sum += column._colSpan
  })
  return sum
}

/** breadth first search for tree depth, as it might be imbalanced */
const _getTreeDepth = (columns) => {
  if (!columns.length) return 0

  const newColumns = []
  columns.forEach(column => {
    if (column.hasOwnProperty('columns')) {
      newColumns.push(column.columns)
    }
  })
  return _getTreeDepth(newColumns) + 1
}

const setColumnLabels = (columns) => {
  return columns.map(column => {
    if (column.hasOwnProperty('columns')) {
      return {
        ...column,
        columns: setColumnLabels(column.columns),
        fieldKey: column.fieldKey || column.header.replace(' ', '').toLowerCase(),
      }
    } else if (Array.isArray(column)) {
      const label = column.map(({dataKey, fieldKey}) => fieldKey || dataKey.substring(dataKey.lastIndexOf('.') + 1)).join('_').replace(' ', '').toLowerCase()
      const fieldKey = column.map(({dataKey, fieldKey}) => fieldKey || dataKey.substring(dataKey.lastIndexOf('.') + 1)).join('_').replace(' ', '').toLowerCase()
      return column.map(column => ({...column, label, fieldKey}))
    } else {
      return {
        ...column,
        label: (column.fieldKey || column.dataKey.substring(column.dataKey.lastIndexOf('.') + 1)).replace(' ', '').toLowerCase(),
        fieldKey: (column.fieldKey || column.dataKey.substring(column.dataKey.lastIndexOf('.') + 1)),
      }
    }
  })
}

const sortByName = (a, b) => {
  const textA = a.name.toLowerCase()
  const textB = b.name.toLowerCase()
  return ((textA < textB) ? -1 : (textA > textB) ? 1 : 0)
}

export {
  getLeafColumns,
  annotateSpans,
  getVisibleColumns,
  sortByName,
}
