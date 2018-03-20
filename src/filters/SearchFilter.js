import {makeFilter} from './utils'
import {Search} from './types'

/**
 * Filter used to search text
 */
const SearchFilter = makeFilter(Search)
SearchFilter.defaultProps = {
  comparisonOptions: [],
  permanent: true,
  name: null,
}

export default SearchFilter
