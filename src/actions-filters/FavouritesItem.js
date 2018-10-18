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
    /** icon to render to remove a favourite */
    RemoveFavouriteIcon: PropTypes.element,
  }

  static defaultProps = {
    RemoveFavouriteIcon: <span>Delete</span>,
  }

  /**
   * This function calls the callback function to set the current
   * favourite to active
   *
   * @param {MouseEvent} event - the click event
   */
  handleClick = event => {
    event.preventDefault()
    const {loadFavourite, name, filters: {activeFilters, optionalFields, activeSort}} = this.props
    loadFavourite(name, activeFilters, optionalFields, activeSort)
  }

  handleDelete = event => {
    event.preventDefault()
    this.props.handleDelete(this.props.name)
  }

  render() {
    const {RemoveFavouriteIcon, isSelected, name} = this.props
    return (
      <div
        className={ClassNames('objectlist-dropdown__item objectlist-dropdown__item--favourite', {
          'objectlist-dropdown__item--selected': isSelected,
        })}
        onClick={this.handleClick}>
        <span>
          {name}
        </span>
        {RemoveFavouriteIcon && React.cloneElement(RemoveFavouriteIcon, {onClick: this.handleDelete})}
      </div>
    )
  }
}
