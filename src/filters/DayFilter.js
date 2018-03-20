import {makeFilter} from './utils'
import {Day} from './types'

/**
 * Filter used to move between days
 */
const DayFilter = makeFilter(Day)
DayFilter.defaultProps = {
  comparisonOptions: [],
  permanent: true,
  name: null,
}

export default DayFilter
