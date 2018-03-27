import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FiltersContainer from './FiltersContainer'
import SelectFilters from './SelectFilters'
import Favourites from './Favourites'
import OptionalFields from './OptionalFields'
import SelectAllAction from './SelectAllAction'
import {SearchFilter} from '../filters'
import {COLUMN_TYPE, FILTER_BASE_TYPE, META_TYPE} from '../utils/proptypes'
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
    /** the column renderer to use, if 2d array they are grouped together  */
    columns: PropTypes.arrayOf(PropTypes.oneOfType([COLUMN_TYPE, PropTypes.arrayOf(COLUMN_TYPE)])),
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
    status: PropTypes.oneOf(['loading', 'error', 'done']),

    /** Object of id: true of selected items */
    selection: PropTypes.object,
    /** callback when selecting all the items. Set to null to not offer this option in the ui. */
    selectAll: PropTypes.func,
    /** callback when deselecting all the items */
    deselectAll: PropTypes.func,
    /** Array of functional components to render custom actions */
    customActions: PropTypes.arrayOf(PropTypes.func),
  }

  static defaultProps = {
    favouritesEnabled: true,
    filters: [],
    favourites: [],
    selection: {},
    columns: [],
  }

  render() {
    const {
      searchKey, meta: {totalCount}, itemCount,
      selection, customActions = [],
      itemSingleName, itemPluralName,
    } = this.props

    const numSelected = Object.keys(selection).length

    let search
    if (searchKey) {
      search = this.props.filters.find(f => f.filterKey === searchKey)
      if (search) {
        search = {
          ...search,
          Renderer: SearchFilter,
          value: search.value || '',
          permanent: true,
          active: true,
        }
      }
    }
    return (
      <div>
        <div className="objectlist-row objectlist-row--right objectlist-row--search">
          {search && <FiltersContainer filters={[search]} updateFilters={this.props.updateFilters} />}
          <div className="objectlist-row">
            <SelectFilters
              filters={this.props.filters}
              addFilter={this.props.addFilter}
            />
            {this.props.favouritesEnabled &&
              <Favourites
                favourites={this.props.favourites}
                handleDeleteFavourite={this.props.handleDeleteFavourite}
                selectedFavouriteName={this.props.selectedFavouriteName}
                handleAddFavourite={this.props.handleAddFavourite}
                loadFavourite={this.props.loadFavourite}
              />}
          </div>
        </div>
        <FiltersContainer
          filters={this.props.filters.filter(f => !search || f.filterKey !== searchKey)}
          updateFilter={this.props.updateFilter}
          removeFilter={this.props.removeFilter}
        />
        {/* TODO: render children below filters */}
        <div className="objectlist-row objectlist-row--justify">
          <span className="objectlist-results-text">
            {`${totalCount ? totalCount.toLocaleString() : 'No'} ${totalCount === 1 ? itemSingleName : itemPluralName} found`}
          </span>
          {customActions.map(action => action({
            selection,
            itemCount,
            numSelected,
            totalCount,
            itemSingleName,
            itemPluralName,
            loading: this.props.status === 'loading',
          }))}
          <OptionalFields
            optionalFields={getVisibleColumns(this.props.columns, [], true).reduce((acc, curr) => acc.concat(curr), [])}
            extraColumns={this.props.meta.extraColumns}
            updateColumns={this.props.updateColumns}
          />
          {this.props.status !== 'loading' && (
            <SelectAllAction
              count={this.props.meta.totalCount}
              itemCount={itemCount}
              numSelected={numSelected}
              selectAll={this.props.selectAll}
              deselectAll={this.props.deselectAll}
            />
          )}
        </div>
      </div>
    )
  }
}

export default ActionsFilterContainer
