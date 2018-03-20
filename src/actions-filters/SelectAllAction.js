import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { loadingSpinner } from '../utils'

class SelectAllAction extends Component {
  static propTypes = {
    /** the loading status of the select all text */
    loading: PropTypes.bool,
    /** the total number of items in the dataset */
    count: PropTypes.number,
    /** the amount of items displayed on the current page */
    itemCount: PropTypes.number,
    /** the number of items currently selected */
    numSelected: PropTypes.number,
    /** callback function to handle selecting all items in the dataset. Set to null to not show it. */
    selectAll: PropTypes.func,
    /** callback function to handle deselecting all items */
    deselectAll: PropTypes.func,
  }
  static defaultProps = {
    loading: false,
    selectAllLink: true,
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
    let selectAll
    if (this.props.selectAll) {
      if (this.props.loading) {
        selectAll = (
          <a className="objectlist-button objectlist-button--link" href="#">
            {loadingSpinner()} Selecting all items ...
          </a>
        )
      } else if (this.props.count > 0 && this.props.numSelected < this.props.count && this.props.numSelected >= this.props.itemCount) {
        selectAll = (
          <a className="objectlist-button objectlist-button--link" href="#" onClick={this.handleSelectAllClick}>
            Select all {this.props.count.toLocaleString()} items
          </a>
        )
      }
    }
    let deselect
    if (this.props.numSelected > 0) {
      deselect = (
        <a className="objectlist-button objectlist-button--link" href="#" onClick={this.handleDeselectAllClick}>De-select all</a>
      )
    }
    return <div>{selectAll}{deselect}</div>
  }
}

export default SelectAllAction
