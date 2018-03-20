import PropTypes from 'prop-types'

const DATE_FORMAT = 'Do MMM YYYY'
const DATETIME_FORMAT = `${DATE_FORMAT} h:mma`
const SHORTDATE_FORMAT = 'DD/MM/YYYY'
const SHORTDATETIME_FORMAT = `${SHORTDATE_FORMAT} h:mma`
const API_DATE_FORMAT = 'YYYY-MM-DD'
const allowedLookupExpressions = ['lt', 'gt', 'lte', 'gte']

const DATA_TYPE = PropTypes.shape({
  key: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  item: PropTypes.func,
  sortable: PropTypes.bool,
  optional: PropTypes.bool,
})

export {
  DATE_FORMAT,
  DATETIME_FORMAT,
  SHORTDATE_FORMAT,
  SHORTDATETIME_FORMAT,
  API_DATE_FORMAT,
  allowedLookupExpressions,
  DATA_TYPE,
}
