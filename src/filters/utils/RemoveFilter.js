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
      <button className="objectlist-button objectlist-button--delete objectlist-button--icon objectlist-button--borderless" onClick={this.props.onClick} title="Remove Filter" />
    )
  }
}

export default RemoveFilter
