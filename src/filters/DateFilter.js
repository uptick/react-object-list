import {Date} from './types'
import {makeFilter} from './utils'

const fixedComparison = {value: 'fixed', label: 'Fixed Date'}
const relativeComparison = {value: 'relative', label: 'Relative to Now'}

/**
 * Filter used to select a date
 */
const DateFilter = makeFilter(Date)
DateFilter.defaultProps = {
  fixedComparison: fixedComparison,
  relativeComparison: relativeComparison,
  comparisonOptions: [fixedComparison, relativeComparison],
  comparison: relativeComparison.value,
}

export default DateFilter
