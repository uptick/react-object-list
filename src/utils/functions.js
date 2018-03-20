/**
 * Filters columns by those in extraColumns to get the visible or optional fields
 * @param  {object[]} columns      Array of columns or arrays of columns
 * @param  {string[]} extraColumns Array of keys of columns currently visible
 * @param  {bool} optional         The value optional is set to in the particular column
 * @return {object[]}              Returns only those columns which are visible
 */
const getVisibleColumns = (columns, extraColumns = [], optional = false) => {
  return columns.filter(column => { // filter the first layer
    if (Array.isArray(column)) {
      return true
    } else if (!!column.optional === optional) {
      return true
    } else if (extraColumns.includes(column.dataKey)) {
      return true
    }
    return false
  }).map(column => { // go into multiheader columns and filter those
    if (Array.isArray(column)) {
      return getVisibleColumns(column, extraColumns, optional)
    }
    return column
  }).filter(column => { // remove any empty multiheader columns
    if (Array.isArray(column) && column.length === 0) {
      return false
    }
    return true
  })
}

const setColumnLabels = (columns) => {
  return columns.map(column => {
    if (Array.isArray(column)) {
      const label = column.map(({dataKey}) => dataKey).join('_').replace(' ', '').toLowerCase()
      return column.map(column => ({...column, label}))
    } else {
      return {...column, label: column.dataKey.replace(' ', '').toLowerCase()}
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
