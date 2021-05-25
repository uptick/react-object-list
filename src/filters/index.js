import {
  Boolean,
  Month,
} from './types'
import {makeFilter} from './utils'

const BooleanFilter = makeFilter(Boolean)
const MonthFilter = makeFilter(Month)

export { BooleanFilter, MonthFilter }

export { default as CurrencyFilter } from './CurrencyFilter'
export { default as ChoiceFilter } from './ChoiceFilter'
export { default as DateFilter } from './DateFilter'
export { default as DayFilter } from './DayFilter'
export { default as MultiChoiceFilter } from './MultiChoiceFilter'
export { default as NumberSliderFilter } from './NumberSliderFilter'
export { default as SearchFilter } from './SearchFilter'
export { default as TextContainsFilter } from './TextContainsFilter'

export { default as RemoteChoiceFilter } from './RemoteChoiceFilter'
export { default as RemoteMultiChoiceFilter } from './RemoteMultiChoiceFilter'
