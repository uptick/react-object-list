import PropTypes from 'prop-types'

import {Choice} from './types'
import {makeFilter} from './utils'

const RemoteChoiceFilter = makeFilter(Choice)
RemoteChoiceFilter.defaultProps = {
  ...RemoteChoiceFilter.defaultProps,
  remote: true,
}
RemoteChoiceFilter.propTypes = {
  ...RemoteChoiceFilter.propTypes,
  loadOptions: PropTypes.func.isRequired,
}

export default RemoteChoiceFilter
