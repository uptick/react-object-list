function floatPrecision(floatValue, precision) {
  floatValue = parseFloat(floatValue)
  if (isNaN(floatValue)) { return parseFloat('0').toFixed(precision) } else {
    const power = Math.pow(10, precision)
    floatValue = (Math.round(floatValue * power) / power).toFixed(precision)
    return floatValue.toString()
  }
}

function commaNumber(numberString) {
  const parts = numberString.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
/**
 * Converts a float to stringed currency representation
 * @param  {number} floatNumber Amount to convert
 * @return {string}             Dollar string
 */
export function currency(floatNumber) {
  return `${floatNumber < 0 ? '-' : ''}$${commaNumber(floatPrecision(Math.abs(floatNumber), 2))}`
}
