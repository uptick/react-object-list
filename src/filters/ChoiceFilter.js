import {Choice} from './types'
import {makeFilter} from './utils'

/**
 * Filter used to select from a list of options
 */
const ChoiceFilter = makeFilter(Choice)
ChoiceFilter.defaultProps = {
  comparisonOptions: [
    {value: 'is', label: 'Is'},
    {value: 'is_not', label: 'Is Not'},
  ],
  comparison: 'is',
  multi: false,
}

export default ChoiceFilter
