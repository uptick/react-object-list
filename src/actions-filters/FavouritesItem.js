import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

/**
 * Class representing one item in a favourites dropdown found in the api-list
 */
export default class FavouritesItem extends React.Component {
  static propTypes = {
    /** callback function that sets this favourite filter as active in the api-list */
    loadFavourite: PropTypes.func,
    /** filters associated with a particular favourite e.g. { "status": "&status=ACTIVE%2CSETUP"} */
    filters: PropTypes.object,
    /** the name of the favourite */
    name: PropTypes.string,
    /** the kind of data being displayed by the api-list eg. "properties:property_list" */
    handleDelete: PropTypes.func,
    /** whether or not the particular filter is selected */
    isSelected: PropTypes.bool,
  }

  /**
   * This function calls the callback function to set the current
   * favourite to active
   *
   * @param {MouseEvent} event - the click event
   */
  handleClick = (event) => {
    event.preventDefault()
    const {loadFavourite, name, filters: {activeFilters, optionalFields, activeSort}} = this.props
    loadFavourite(name, activeFilters, optionalFields, activeSort)
  }

  handleDelete = e => {
    e.preventDefault()
    this.props.handleDelete(this.props.name)
  }

  render() {
    return (
      <div
        className={ClassNames('apilist-dropdown__item', {
          'apilist-dropdown__item--selected': this.props.isSelected,
        })}
        onClick={this.handleClick}>
        <span>
          {this.props.name}
        </span>
        <i onClick={this.handleDelete} className="fa fa-trash-o apilist-delete" />
      </div>
    )
  }
}
