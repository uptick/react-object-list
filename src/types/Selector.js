import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders an individual checkbox for a row inside an objectlist
 */
class Selector extends React.Component {
  static propTypes = {
    /** callback function passed down from the objectlist to select/unselect an individual item */
    toggleSelect: PropTypes.func,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    selected: PropTypes.bool,
  }

  static defaultProps = {
    selected: false,
  }

  /**
   * Calls the callback function with the id for the item
   */
  handleChange = () => {
    this.props.toggleSelect(this.props.id)
  }

  render() {
    return (
      <input
        type="checkbox"
        checked={this.props.selected}
        onClick={this.handleChange}
      />
    )
  }
}

export default Selector
