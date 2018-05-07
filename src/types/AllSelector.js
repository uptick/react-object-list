import React from 'react'
import PropTypes from 'prop-types'

/**
 * Checkbox with a callback function for selecting all elements in an
 * api list
 */
class AllSelector extends React.Component {
  static propTypes = {
    /** number of items in the list selected */
    numSelected: PropTypes.number,
    /** number of items in the list */
    total: PropTypes.number,
    /** callback function passed down from the objectlist to select all items in a list */
    selectAll: PropTypes.func,
    /** callback function passed down from the objectlist to deselect all items in a list */
    deselectAll: PropTypes.func,
  }

  static defaultProps = {
    numSelected: 0,
    total: 0,
  }

  /**
   * Callback function executed by the api list
   * to select every element in the table
   */
  handleChange = () => {
    const {numSelected, selectAll, deselectAll} = this.props
    if (numSelected > 0) {
      deselectAll()
    } else {
      selectAll()
    }
  }

  __setIndeterminate = (numSelected, total) => {
    this.checkbox.indeterminate = (numSelected > 0 && numSelected < total)
  }

  componentDidMount() {
    const {numSelected, total} = this.props
    this.__setIndeterminate(numSelected, total)
  }

  componentDidUpdate() {
    const {numSelected, total} = this.props
    this.__setIndeterminate(numSelected, total)
  }

  render() {
    const {numSelected, total} = this.props
    return (
      <input
        type="checkbox"
        checked={total > 0 && numSelected >= total}
        onChange={this.handleChange}
        ref={elem => { this.checkbox = elem }}
      />
    )
  }
}

export default AllSelector
