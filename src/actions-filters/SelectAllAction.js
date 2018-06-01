import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SelectAllAction extends PureComponent {
  static propTypes = {
    /** the total number of items in the dataset */
    count: PropTypes.number,
    /** the amount of items displayed on the current page */
    itemCount: PropTypes.number,
    /** the name used to describe multiples of the items displayed */
    itemPluralName: PropTypes.string,
    /** the number of items currently selected */
    numSelected: PropTypes.number,
    /** callback function to handle selecting all items in the dataset. Set to null to not show it. */
    selectAll: PropTypes.func,
    /** callback function to handle deselecting all items */
    deselectAll: PropTypes.func,
  }

  handleSelectAllClick = (event) => {
    event.preventDefault()
    this.props.selectAll()
  }

  handleDeselectAllClick = event => {
    event.preventDefault()
    this.props.deselectAll()
  }

  render() {
    const {selectAll, count, numSelected, itemPluralName, itemCount} = this.props
    let selectAllLink
    if (selectAll && count > 0 && numSelected < count && numSelected >= itemCount) {
      selectAllLink = (
        <a
          className="objectlist-link"
          href="#"
          onClick={this.handleSelectAllClick}
        >
          Select all {count.toLocaleString()} {itemPluralName && itemPluralName.toLowerCase()}
        </a>
      )
    }
    let deselectLink
    if (numSelected > 0) {
      deselectLink = (
        <a
          className="objectlist-link"
          href="#"
          onClick={this.handleDeselectAllClick}
        >
          Clear selection
        </a>
      )
    }
    if (selectAllLink || deselectLink) {
      return (
        <div className="objectlist-row">
          {selectAllLink}{deselectLink}
        </div>
      )
    } else {
      return null
    }
  }
}

export default SelectAllAction
