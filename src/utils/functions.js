const isColumnVisible = (column, extraColumns = [], optional = false) => {
  const lookup = column.fieldKey || (('dataKey' in column && column.dataKey) ? column.dataKey.substring(column.dataKey.lastIndexOf('.') + 1) : null)
  if (Array.isArray(column)) {
    column.map(column)
  } else if (!!column.optional === optional) {
    return true
  } else if (lookup && extraColumns.includes(lookup)) {
    return true
  }
  return false
}

/**
 * Filters columns by those in extraColumns to get the visible or optional fields
 * @param  {object[]} columns      Array of columns or arrays of columns
 * @param  {string[]} extraColumns Array of keys of columns currently visible
 * @param  {bool} optional         The value optional is set to in the particular column
 * @return {object[]}              Returns only those columns which are visible
 */
const getVisibleColumns = (columns, extraColumns = [], optional = false) => {
  let visibleColumns = []
  columns.map(column => { // filter the first layer
    if (Array.isArray(column)) {
      const arrayColumns = getVisibleColumns(column, extraColumns, optional)
      visibleColumns = [...visibleColumns, ...arrayColumns]
    } else {
      if (isColumnVisible(column, extraColumns, optional)) {
        if ('columns' in column) {
          const arrayColumns = getVisibleColumns(column.columns, extraColumns, optional)
          visibleColumns = [...visibleColumns, ...arrayColumns]
        }
        visibleColumns.push(column)
      }
    }
  })
  return visibleColumns.filter(col => !!col).map(
    ({fieldKey}) => fieldKey
  )
}

const setColumnLabels = (columns) => {
  return columns.map(column => {
    if (Array.isArray(column)) {
      const label = column.map(({dataKey, fieldKey}) => fieldKey || dataKey.substring(dataKey.lastIndexOf('.') + 1)).join('_').replace(' ', '').toLowerCase()
      return column.map(column => ({...column, label}))
    } else {
      return {...column, label: (column.fieldKey || (('dataKey' in column && column.dataKey) ? column.dataKey.substring(column.dataKey.lastIndexOf('.') + 1) : '')).replace(' ', '').toLowerCase()}
    }
  })
}

const sortByName = (a, b) => {
  const textA = a.name.toLowerCase()
  const textB = b.name.toLowerCase()
  return ((textA < textB) ? -1 : (textA > textB) ? 1 : 0)
}

export {
  getVisibleColumns,
  setColumnLabels,
  sortByName,
}
