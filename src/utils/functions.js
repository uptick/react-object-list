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
      // check the next node down
      const visible = column.optional !== undefined && _checkVisibilityHelper(column, extraColumns, optional)
      if (column.optional === undefined || visible) {
        const columns = getVisibleColumns(column.columns, extraColumns, optional)
        if (columns.length || visible) {
          acc.push({...column, columns})
        }
      }
    } else if (Array.isArray(column)) {
      // is a grouped column, check each of the items in the group
      const columns = column.filter(leafColumn => _checkVisibilityHelper(leafColumn, extraColumns, optional))
      if (columns.length) {
        acc.push(columns)
      }
    } else if (_checkVisibilityHelper(column, extraColumns, optional)) {
      // is a leaf node, check individual column
      acc.push(column)
    }
    return acc
  }, [])
}

const _checkVisibilityHelper = (column, extraColumns, optional) => {
  return !!column.optional === optional ||
  extraColumns.includes(column.fieldKey)
}

/** get all the leaves of an unbalanced tree */
const getLeafColumns = (columns) => {
  return columns.reduce((acc, column) => {
    if (column.hasOwnProperty('columns')) {
      return acc.concat(getLeafColumns(column.columns))
    }
    acc.push(column)
    return acc
  }, [])
}

/**
 * Annotates each column with a _colSpan and _rowSpan in the tree
 * which is used when rendering them
 *
 * @param {object[]} columns  Array of columns
 */
const annotateSpans = columns => {
  const depth = _getTreeDepth(columns)
  _annotateColumnSpan(columns, depth)
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

  let newColumns = []
  columns.forEach(column => {
    if (column.hasOwnProperty('columns')) {
      newColumns = newColumns.concat(column.columns)
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
      const labels = column.map(({dataKey, fieldKey}) => fieldKey || dataKey.substring(dataKey.lastIndexOf('.') + 1))
      const fieldKeys = column.map(({dataKey, fieldKey}) => fieldKey || dataKey.substring(dataKey.lastIndexOf('.') + 1))
      return column.map(column => {
        const label = column.label || labels.join('_').replace(' ', '').toLowerCase()
        const fieldKey = column.fieldKey || fieldKeys.join('_').replace(' ', '').toLowerCase()
        const labelledColumn = {...column, label, fieldKey}
        labels.push(labels.shift())
        fieldKeys.push(fieldKeys.shift())
        return labelledColumn
      })
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

/**
 * Checks React Component to see if it is functional or class based
 * https://stackoverflow.com/a/41658173
 * @param  {Function}  component React Component
 * @return {Boolean}           True if class based
 */
const isClassComponent = component => (
  typeof component === 'function' &&
  !!component.prototype.isReactComponent
)

export {
  _getTreeDepth,
  getLeafColumns,
  setColumnLabels,
  annotateSpans,
  getVisibleColumns,
  sortByName,
  isClassComponent,
}
