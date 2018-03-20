import {makeFilter} from './utils'
import {Search} from './types'

/**
 * Filter used to search text containing
 */
const TextContainsFilter = makeFilter(Search)
TextContainsFilter.defaultProps = {
  comparisonOptions: [
    {value: 'contains', label: 'Contains'},
    {value: 'not_contains', label: 'Does Not Contain'},
  ],
}

export default TextContainsFilter
