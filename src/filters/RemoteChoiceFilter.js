import React from 'react'
import PropTypes from 'prop-types'

import {Choice} from './types'
import {makeFilter} from './utils'

const RemoteChoiceFilterFunc = ({
  allowNull,
  nullOption,
  valueKey = RemoteChoiceFilter.defaultProps.valueKey,
  labelKey = RemoteChoiceFilter.defaultProps.labelKey,
  name,
  options,
  autoload,
  ...otherProps
}) => {
  if (allowNull && !nullOption) {
    nullOption = {[valueKey]: 'none', [labelKey]: `No ${name || 'selection'}`}
  }
  const allOptions = nullOption ? [nullOption, ...(options || [])] : options
  const filterProps = {
    name,
    labelKey,
    valueKey,
    ...otherProps,
    options: allOptions,
    autoload: autoload ? allOptions : autoload,
  }
  const ChoiceFilter = makeFilter(Choice)
  return <ChoiceFilter {...filterProps} />
}

class RemoteChoiceFilter extends React.Component {
  render() {
    return RemoteChoiceFilterFunc(this.props)
  }
}

RemoteChoiceFilter.defaultProps = {
  ...RemoteChoiceFilter.defaultProps,
  remote: true,
  autoload: true,
  options: undefined,
  allowNull: false,
}
RemoteChoiceFilter.propTypes = {
  ...RemoteChoiceFilter.propTypes,
  loadOptions: PropTypes.func.isRequired,
}

export default RemoteChoiceFilter
