import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component to render button used to remove a filter
 */
class RemoveFilter extends React.Component {
  static propTypes = {
    /** Function to be called to remove filter */
    onClick: PropTypes.func.isRequired,
    /** Icon to be rendered in button */
    Icon: PropTypes.element,
  }

  static defaultProps = {
    Icon: null,
  }

  render() {
    const {Icon, onClick} = this.props
    return (
      <button
        className="objectlist-button objectlist-button--delete objectlist-button--icon objectlist-button--borderless"
        onClick={onClick}
        title="Remove Filter"
      >
        {Icon}
      </button>
    )
  }
}

export default RemoveFilter
