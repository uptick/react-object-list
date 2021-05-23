import {
  Boolean,
  Month,
} from './types'
import {makeFilter} from './utils'

const BooleanFilter = makeFilter(Boolean)
const MonthFilter = makeFilter(Month)

export { BooleanFilter, MonthFilter }
export CurrencyFilter from './CurrencyFilter'
export ChoiceFilter from './ChoiceFilter'
export DateFilter from './DateFilter'
export DayFilter from './DayFilter'
export MultiChoiceFilter from './MultiChoiceFilter'
export NumberSliderFilter from './NumberSliderFilter'
export SearchFilter from './SearchFilter'
export TextContainsFilter from './TextContainsFilter'

export RemoteChoiceFilter from './RemoteChoiceFilter'
export RemoteMultiChoiceFilter from './RemoteMultiChoiceFilter'
