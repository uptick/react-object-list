import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import FavouritesItem from './FavouritesItem'

class Favourites extends Component {
  static propTypes = {
    /** list of favourites available to select from */
    favourites: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      filters: PropTypes.shape({
        activeFilters: PropTypes.object, // {filterKey: filterValue} eg. {status: '&status=ACTIVE'}
        optionalFields: PropTypes.object, // {fieldName1: true, fieldName2: true} - value always seem to be true
        activeSort: PropTypes.string, // eg. '-id'
      }),
    })),
    /** callback function when deleting a favourite */
    handleDeleteFavourite: PropTypes.func,
    /** the name of the currently selected favourite name */
    selectedFavouriteName: PropTypes.string,
    /** callback function when adding a new favourite */
    handleAddFavourite: PropTypes.func,
    /** callback function to set the selected favourite to the current favourite */
    loadFavourite: PropTypes.func,
  }

  static defaultProps = {
    favourites: [],
    selectedFavouriteName: null,
  }

  state = {
    favouritesOpen: false,
    newFavouriteName: '',
    selectedFavouriteName: this.props.selectedFavouriteName,
  }

  componentWillMount() {
    document.body.addEventListener('click', this.handleDropdown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleDropdown)
  }

  componentWillReceiveProps(nextProps) {
    const { selectedFavouriteName } = nextProps
    if (selectedFavouriteName !== this.state.selectedFavouriteName) {
      this.setState({selectedFavouriteName})
    }
  }

  /**
   * Toggles open status of favourites dropdown
   */
  handleDropdown = (event) => {
    this.setState(prevState => {
      const newState = {
        favouritesOpen: false,
      }
      if (event.target === this.favouritesButton) {
        newState.favouritesOpen = !prevState.favouritesOpen
      } else if (event.path.some(el => el.className && el.className.includes('objectlist-dropdown'))) {
        newState.favouritesOpen = true
      }
      return newState
    })
  }

  handleAddFavourite = event => {
    event.preventDefault()
    const selectedFavouriteName = this.state.newFavouriteName
    this.props.handleAddFavourite(selectedFavouriteName)
    this.setState(() => ({
      newFavouriteName: '',
      selectedFavouriteName,
    }))
  }

  /**
   * Renames the favourite in state
   */
  handleFavouriteNameChange = () => {
    const newValue = this.newFavouriteName.value
    this.setState(() => ({
      newFavouriteName: newValue.replace('_', ''),
    }))
  }

  render() {
    const favourites = this.props.favourites.map(favourite => (
      <FavouritesItem
        key={`favourite-${favourite.name}`}
        {...favourite}
        loadFavourite={this.props.loadFavourite}
        handleDelete={this.props.handleDeleteFavourite}
        isSelected={favourite.name === this.state.selectedFavouriteName}
      />
    ))

    return (
      <div className={ClassNames('objectlist-dropdown', {
        open: this.state.favouritesOpen,
      })} ref={el => { this.favouritedDropdown = el }}>
        <button
          className={ClassNames('objectlist-button--dropdown objectlist-button objectlist-button--favourites', {
            open: this.state.favouritesOpen,
          })}
          type="button"
          ref={el => { this.favouritesButton = el }}>
          <i className="fa fa-heart-o" /> Favourites
        </button>
        <div
          className="objectlist-dropdown__menu">
          {favourites}
          {!!favourites.length && <div className="objectlist-dropdown__divider" />}
          <div className="objectlist-dropdown__item objectlist-dropdown__item--input">
            <form onSubmit={this.handleAddFavourite}>
              <input
                type="text"
                ref={el => { this.newFavouriteName = el }}
                className="objectlist-input objectlist-input__favourite"
                placeholder="Save as new"
                value={this.state.newFavouriteName}
                onChange={this.handleFavouriteNameChange} />
              <button type="submit" hidden>Add</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Favourites
