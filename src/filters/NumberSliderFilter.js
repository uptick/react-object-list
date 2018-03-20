import {NumberSlider} from './types'
import {makeFilter} from './utils'

/**
 * Filter used to select a range of numbers
 */
const NumberSliderFilter = makeFilter(NumberSlider)
NumberSliderFilter.defaultProps = {
  comparisonOptions: [
    {value: 'exact', label: 'Exact'},
    {value: 'gt', label: 'Greater than'},
    {value: 'lt', label: 'Less than'},
    {value: 'gte', label: 'Greater than or equal'},
    {value: 'lte', label: 'Less than or equal'},
  ],
  comparison: 'exact',
}

export default NumberSliderFilter
