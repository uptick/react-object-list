import PropTypes from 'prop-types'
import { or } from 'airbnb-prop-types'

const STATUS_CHOICES = {
  loading: 'loading',
  error: 'error',
  done: 'done',
}
const STATUS_TYPE = PropTypes.oneOf(Object.values(STATUS_CHOICES))

const ALL_SELECTED = 'all'
const SELECTION_TYPE = or([PropTypes.oneOf([ALL_SELECTED]), PropTypes.oneOfType([PropTypes.object])])

const COLUMN_BASE_TYPE = {
  dataKey: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  item: PropTypes.func,
  sortable: PropTypes.bool,
  optional: PropTypes.bool,
}

const COLUMN_TYPE = PropTypes.shape(COLUMN_BASE_TYPE)

const FILTER_BASE_TYPE = {
  /** Name of filter, used to render filter */
  name: PropTypes.string,
  /** Identifier key for filter */
  filterKey: PropTypes.string,
  /** If true, indicates the filter cannot be removed */
  permanent: PropTypes.bool,
}

const META_TYPE = PropTypes.shape({
  /** the current sortkeys applied using {key: asc_desc_bool } eg. {name: true} for ascending */
  sortKeys: PropTypes.arrayOf(PropTypes.object),
  /** current page highlighted on the pagination */
  currentPage: PropTypes.number,
  /** the maximum number of items shown on a page */
  perPage: PropTypes.number,
  /** the keys of the optional columns that are currently being displayed */
  extraColumns: PropTypes.arrayOf(PropTypes.string),
  /** the total number of items in the dataset if only displaying a subset */
  totalCount: PropTypes.number,
  /** the list of items currently selected */
  selection: PropTypes.array,
})

export {
  COLUMN_TYPE,
  COLUMN_BASE_TYPE,
  FILTER_BASE_TYPE,
  META_TYPE,
  STATUS_TYPE,
  STATUS_CHOICES,
  SELECTION_TYPE,
  ALL_SELECTED,
}