import PropTypes from 'prop-types'

import {Choice} from './types'
import {makeFilter} from './utils'

const RemoteChoiceFilter = makeFilter(Choice)
RemoteChoiceFilter.defaultProps = {
  ...RemoteChoiceFilter.defaultProps,
  remote: true,
  autoload: true,
  options: undefined,
}
RemoteChoiceFilter.propTypes = {
  ...RemoteChoiceFilter.propTypes,
  loadOptions: PropTypes.func.isRequired,
}

export default RemoteChoiceFilter
