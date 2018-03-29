/**
 * Gets the value of the cell from the row and keys provided
 * @param  {Object} row  Row supplied
 * @param  {Array|string} keys List of keys used to access the value
 * @return {(Object|string|number)}      Value from row, or row itself if no keys
 */
const getValueFromAccessor = (row, keys) => {
  if (!Array.isArray(keys)) keys = keys.split('.')
  let value = row
  const cloneKeys = [...keys]
  while (value && cloneKeys.length) {
    const thisKey = cloneKeys.shift()
    if (thisKey in value) {
      value = value[thisKey]
    }
  }
  return value
}

export {
  getValueFromAccessor,
}
