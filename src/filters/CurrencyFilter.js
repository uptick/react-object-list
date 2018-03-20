import {Currency} from './types'
import {makeFilter} from './utils'

/**
 * Filter used to filter by a monetary value
 */
const CurrencyFilter = makeFilter(Currency)
CurrencyFilter.defaultProps = {
  comparisonOptions: [
    {value: 'exact', label: 'Exact'},
    {value: 'gt', label: 'Greater than'},
    {value: 'lt', label: 'Less than'},
    {value: 'gte', label: 'Greater than or equal'},
    {value: 'lte', label: 'Less than or equal'},
  ],
}

export default CurrencyFilter
