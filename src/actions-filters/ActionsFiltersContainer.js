import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FiltersContainer from './FiltersContainer'
import SelectFilters from './SelectFilters'
import Favourites from './Favourites'
import OptionalFields from './OptionalFields'
import SelectAllAction from './SelectAllAction'
import {
  FILTER_BASE_TYPE,
  META_TYPE,
  STATUS_TYPE,
  STATUS_CHOICES,
  SELECTION_TYPE,
} from '../utils/proptypes'
import {getVisibleColumns} from '../utils/functions'

class ActionsFilterContainer extends Component {
  static propTypes = {
    ...Favourites.propTypes,
    ...FiltersContainer.propTypes,
    /** If set, creates search filter with this key */
    searchKey: PropTypes.string,
    /** Name used to refer to each item returned from the api */
    itemSingleName: PropTypes.string.isRequired,
    /** Plural form of itemSingleName */
    itemPluralName: PropTypes.string.isRequired,
    /** the amount of items in this subset of the dataset query */
    itemCount: PropTypes.number,
    /** the columns to render, use an array with objects. Objects containing 'columns' will be treated as a header group */
    columns: PropTypes.array,
    /** callback function when toggling an extra column on or off */
    updateColumns: PropTypes.func,
    /** whether or not favourites is enabled */
    favouritesEnabled: PropTypes.bool,
    /** list of favourites available to select from */
    favourites: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      filters: PropTypes.shape({
        activeFilters: PropTypes.object, // {filterKey: filterValue} eg. {status: '&status=ACTIVE'}
        optionalFields: PropTypes.object, // {fieldName1: true, fieldName2: true} - value always seem to be true
        activeSort: PropTypes.string, // eg. '-id'
      }),
    })),
    filters: PropTypes.arrayOf(PropTypes.shape({
      ...FILTER_BASE_TYPE,
      active: PropTypes.bool,
    })),
    /** describe the data displayed. Used if it is a subset of a larger dataset */
    meta: META_TYPE,
    /** callback to add a filter to the list of active filters */
    addFilter: PropTypes.func,
    /** callback containing the updated {filterKey, comparison, value} */
    updateFilter: PropTypes.func,
    /** callback to remove a filter from the active list of filters */
    removeFilter: PropTypes.func,
    /** loading status used if data is loaded asynchronously  */
    status: STATUS_TYPE,

    /** Count of selected items */
    numSelected: PropTypes.number,
    /** Object of id: true of selected items */
    selection: SELECTION_TYPE,
    /** callback when selecting all the items. Set to null to not offer this option in the ui. */
    selectAll: PropTypes.func,
    /** callback when deselecting all the items */
    deselectAll: PropTypes.func,
    /** Array of functional components to render custom actions */
    customActions: PropTypes.arrayOf(PropTypes.func),
    /** Dictionary of icon elements */
    icons: PropTypes.object,
  }

  static defaultProps = {
    favouritesEnabled: true,
    filters: [],
    favourites: [],
    selection: {},
    columns: [],
    status: STATUS_CHOICES.done,
  }

  state = {
    columns: getVisibleColumns(this.props.columns, [], true),
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.columns !== nextProps.columns) {
      this.setState(() => ({
        columns: getVisibleColumns(nextProps.columns, [], true),
      }))
    }
  }

  componentDidMount() {
    const search = this.props.filters.find(f => f.filterKey === this.props.searchKey)
    if (search && !search.active) {
      this.props.addFilter(search)
    }
  }

  render() {
    const {
      searchKey, meta: {totalCount}, itemCount,
      selection, customActions = [], icons = {},
      itemSingleName, itemPluralName, numSelected,
      filters, updateFilter, removeFilter, status,
      updateColumns, loadFavourite, handleAddFavourite,
      selectedFavouriteName, handleDeleteFavourite, favourites,
    } = this.props
    const loading = status === STATUS_CHOICES.loading
    let search
    if (searchKey) {
      search = filters.find(f => f.filterKey === searchKey)
      if (search) {
        search = {
          ...search,
          value: search.value || '',
          permanent: true,
          active: true,
        }
      }
    }

    return (
      <div>
        <div className="objectlist-row objectlist-row--right objectlist-row--search">
          {search && (
            <FiltersContainer
              filters={[search]}
              updateFilter={updateFilter}
              removeFilter={removeFilter}
            />
          )}
          <div className="objectlist-row">
            <SelectFilters
              filters={filters.filter(f => !search || f.filterKey !== searchKey)}
              addFilter={this.props.addFilter}
            />
            {this.props.favouritesEnabled &&
              <Favourites
                favourites={favourites}
                handleDeleteFavourite={handleDeleteFavourite}
                selectedFavouriteName={selectedFavouriteName}
                handleAddFavourite={handleAddFavourite}
                loadFavourite={loadFavourite}
                FavouritesIcon={icons.Favourites}
                RemoveFavouriteIcon={icons.RemoveFavourite}
              />}
          </div>
        </div>
        <FiltersContainer
          filters={filters.filter(f => !search || f.filterKey !== searchKey)}
          updateFilter={updateFilter}
          removeFilter={removeFilter}
          icons={icons}
        />
        {/* TODO: render children below filters */}
        <div className="objectlist-row objectlist-row__actions">
          <div className="objectlist-column">
            <span className="objectlist-results-text">
              {loading ? `Loading ${itemPluralName}...` : (
                `${totalCount ? totalCount.toLocaleString() : 'No'} ${totalCount === 1 ? itemSingleName : itemPluralName} found`
              )}
            </span>
            {customActions[0] && customActions[0]({
              selection,
              itemCount,
              numSelected,
              totalCount,
              itemSingleName,
              itemPluralName,
              loading,
              key: `action-left`,
            })}
            {this.props.status === STATUS_CHOICES.done && (
              <SelectAllAction
                count={this.props.meta.totalCount}
                itemCount={itemCount}
                itemPluralName={itemPluralName}
                numSelected={numSelected}
                selectAll={this.props.selectAll}
                deselectAll={this.props.deselectAll}
              />
            )}
          </div>
          <div className="objectlist-column">
            {customActions.slice(1).map((action, i) => action({
              selection,
              itemCount,
              numSelected,
              totalCount,
              itemSingleName,
              itemPluralName,
              loading,
              key: `action-${i}`,
            }))}
            <OptionalFields
              optionalFields={this.state.columns}
              extraColumns={this.props.meta.extraColumns}
              updateColumns={updateColumns}
              OpenIcon={icons.DropdownOpen}
              CloseIcon={icons.DropdownClose}
              OptionalFieldsIcon={icons.OptionalFields}
              CheckboxCheckedIcon={icons.CheckboxChecked}
              CheckboxUnCheckedIcon={icons.CheckboxUnchecked}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ActionsFilterContainer
