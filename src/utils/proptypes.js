import PropTypes from 'prop-types'

const STATUS_CHOICES = {
  loading: 'loading',
  error: 'error',
  done: 'done',
}
const STATUS_TYPE = PropTypes.oneOf(Object.values(STATUS_CHOICES))

const ALL_SELECTED = 'all'
function selectionTypeValidator(isRequired) {
  return function(props, propName, componentName) {
    const value = props[propName]
    if (isRequired && (value === null || value === undefined)) {
      return new Error(`Missing prop \`${propName}\`
      supplied to \`${componentName}\` expected one of ['${ALL_SELECTED}', obj]`)
    }
    let validObject = true
    if (typeof value === 'object') {
      validObject = Object.entries(value).every(
        ([key, value]) => (typeof key === 'number' || 'string') && typeof value === 'boolean')
    } else {
      validObject = false
    }

    if (value !== ALL_SELECTED && !validObject) {
      return new Error(`Invalid prop \`${propName}\` of \`${value}\`
        supplied to \`${componentName}\` expected one of ['${ALL_SELECTED}', obj]`)
    }
  }
}
const SELECTION_TYPE = selectionTypeValidator(false)
SELECTION_TYPE.isRequired = selectionTypeValidator(true)

const COLUMN_BASE_TYPE = {
  fieldKey: PropTypes.string, // used to uniquely identify this column
  dataKey: PropTypes.string, // used to access the data inside the data object
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  item: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  sortKey: PropTypes.string,
  optional: PropTypes.bool,
  /* string or function of a data row returning a string to add to row classes */
  rowClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
