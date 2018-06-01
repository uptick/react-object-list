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
    } else if (extraColumns.includes(
      column.fieldKey ||
      column.dataKey.substring(column.dataKey.lastIndexOf('.') + 1)
    )) {
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
      const label = column.map(({dataKey, fieldKey}) => fieldKey || dataKey.substring(dataKey.lastIndexOf('.') + 1)).join('_').replace(' ', '').toLowerCase()
      return column.map(column => ({...column, label}))
    } else {
      return {...column, label: (column.fieldKey || column.dataKey.substring(column.dataKey.lastIndexOf('.') + 1)).replace(' ', '').toLowerCase()}
    }
  })
}

const sortByName = (a, b) => {
  const textA = a.name.toLowerCase()
  const textB = b.name.toLowerCase()
  return ((textA < textB) ? -1 : (textA > textB) ? 1 : 0)
}

const objEqual = (prev = {}, current = {}) => {
  if (Object.keys(prev).length !== Object.keys(current).length) {
    return false
  }
  return Object.entries(prev).every(
    ([key, value]) => valueEqual(current[key], value)
  )
}

const arrayEqual = (prev = [], current = []) => {
  if (prev.length !== current.length) {
    return false
  }
  return prev.every((entry, i) => valueEqual(current[i], entry))
}

const valueEqual = (a, b) => {
  if (typeof a !== typeof b) {
    return false
  }
  if (typeof a === 'object') {
    if (a === null || b === null) {
      return a === b
    }
    if (Array.isArray(a)) {
      if (Array.isArray(b)) {
        return arrayEqual(a, b)
      }
      return false
    }
    return objEqual(a, b)
  }
  return a === b
}

export {
  getVisibleColumns,
  setColumnLabels,
  sortByName,
  valueEqual,
}
