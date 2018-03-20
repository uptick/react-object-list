import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component to render button used to remove a filter
 */
class RemoveFilter extends React.Component {
  static propTypes = {
    /** Function to be called to remove filter */
    onClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <button className="apilist-button apilist-button--delete apilist-button--icon apilist-button--borderless" onClick={this.props.onClick} />
    )
  }
}

export default RemoveFilter
