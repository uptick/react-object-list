import React from 'react'
import PropTypes from 'prop-types'

/**
 * Checkbox with a callback function for selecting all elements in an
 * api list
 */
class AllSelector extends React.Component {
  static propTypes = {
    /** wether or not all items in the list are selected and hence this component is checked */
    allSelected: PropTypes.bool,
    /** callback function passed down from the ApiList to select all items in a list */
    toggleSelectAll: PropTypes.func,
  }

  static defaultProps = {
    allSelected: false,
  }

  /**
   * Callback function executed by the api list
   * to select every element in the table
   */
  handleChange = () => {
    this.props.toggleSelectAll()
  }

  render() {
    return (
      <input
        type="checkbox"
        checked={this.props.allSelected}
        onClick={this.handleChange}
      />
    )
  }
}

export default AllSelector
