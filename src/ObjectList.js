import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ActionsFiltersContainer from './actions-filters/ActionsFiltersContainer'
import Table from './data-renderers/Table'
import {Pagination as DefaultPagination} from './pagination'
import {
  COLUMN_TYPE,
  FILTER_BASE_TYPE,
  META_TYPE,
  STATUS_TYPE,
  STATUS_CHOICES,
  SELECTION_TYPE,
  ALL_SELECTED,
} from './utils/proptypes'
import {
  loadingSpinner,
  ErrorMessage as DefaultErrorMessage,
} from './utils'

class ObjectList extends Component {
  static propTypes = {
    /** the renderer used to display the data ie. list/table/custom */
    DataRenderer: PropTypes.func,
    /** the renderer used to display the page controls */
    Pagination: PropTypes.func,
    /** the renderer used to display errors */
    ErrorMessage: PropTypes.func,
    /** the data to be displayed by the object-list */
    data: PropTypes.arrayOf(PropTypes.object),
    /** describe the data displayed. Used if it is a subset of a larger dataset */
    meta: META_TYPE,
    /** the maximum number of pages visible in the pagination navigation selection */
    maxPages: PropTypes.number,
    /** loading status used if data is loaded asynchronously  */
    status: STATUS_TYPE,
    /** provide the specific error details if there is an error */
    error: DefaultErrorMessage.propTypes.error,
    /** array of potential filters that can be displayed inside the object-list */
    filters: PropTypes.arrayOf(PropTypes.shape({
      ...FILTER_BASE_TYPE,
      active: PropTypes.bool,
    })),
    /** function called when a datapoint's representation is clicked on **/
    itemOnClick: PropTypes.func,
    /** the column renderer to use, if 2d array they are grouped together  */
    columns: PropTypes.arrayOf(PropTypes.oneOfType([COLUMN_TYPE, PropTypes.arrayOf(COLUMN_TYPE)])),
    /** callback function when toggling an extra column on or off */
    updateColumns: PropTypes.func,
    /** callback to add a filter to the list of active filters */
    addFilter: PropTypes.func,
    /** callback containing the new filter {filterKey, comparison, value} */
    updateFilter: PropTypes.func,
    /** callback to remove a filter from the active list of filters */
    removeFilter: PropTypes.func,
    /** callback containing the new page number */
    updatePage: PropTypes.func,
    /** callback to update sort keys */
    updateSorting: PropTypes.func,
    /** the name of a specific item, leave itemPluralName blank if it's just itemSingleName + 's' */
    itemSingleName: PropTypes.string,
    itemPluralName: PropTypes.string,
    /** If set, creates search filter with this key */
    searchKey: PropTypes.string,

    /** disable favourites when not required */
    favouritesEnabled: PropTypes.bool,
    /** the current list of favourites used for preferences */
    favourites: ActionsFiltersContainer.propTypes.favourites,
    /** the name of the currently selected favourite name */
    selectedFavouriteName: PropTypes.string,
    /** callback function when adding a new favourite */
    handleAddFavourite: PropTypes.func,
    /** callback function when deleting a favourite */
    handleDeleteFavourite: PropTypes.func,
    /** callback function to set the selected favourite to the current favourite */
    loadFavourite: PropTypes.func,

    /** IDs of currently selected items */
    selection: SELECTION_TYPE,
    /** callback for when items are selected. Takes as argument a list of IDs, a single ID,
     'all', or null.  Parent should use this to update `selection` prop
      */
    selectItems: PropTypes.func,
    /** Array of custom actions to be rendered */
    customActions: PropTypes.arrayOf(PropTypes.func),
  }

  static defaultProps = {
    status: STATUS_CHOICES.done,
    DataRenderer: Table,
    Pagination: DefaultPagination,
    ErrorMessage: DefaultErrorMessage,
    data: [],
    columns: [],
    customActions: [],
    error: null,
    maxPages: 5,
    favouritesEnabled: true,
    meta: {},
    selection: {},
    itemSingleName: 'item',
  }

  state = {
    itemSingleName: this.props.itemSingleName,
    itemPluralName: this.props.itemPluralName ? this.props.itemPluralName : `${this.props.itemSingleName}s`,
  }

  // TODO: Allow this to be overriden from props, so that the option to select all can be disabled.
  selectAll = () => {
    this.props.selectItems('all')
  }

  deselectAll = () => {
    this.props.selectItems(null)
  }

  render() {
    const {
      DataRenderer, Pagination, ErrorMessage,
      filters, addFilter, updateFilter, meta, status, searchKey,
      data, columns, updateColumns, itemOnClick,
      favourites, handleDeleteFavourite, handleAddFavourite, favouritesEnabled,
      selectedFavouriteName, loadFavourite, maxPages, removeFilter,
      updatePage, updateSorting, selection, selectItems, customActions, error,
    } = this.props
    const { itemSingleName, itemPluralName } = this.state
    const { totalCount, perPage, currentPage } = meta
    const numSelected = selection === ALL_SELECTED ? totalCount : Object.keys(selection).length
    return (
      <div>
        <ActionsFiltersContainer
          filters={filters}
          addFilter={addFilter}
          updateFilter={updateFilter}
          removeFilter={removeFilter}
          meta={meta}
          status={status}
          searchKey={searchKey}
          itemSingleName={itemSingleName}
          itemPluralName={itemPluralName}
          itemCount={data.length}
          columns={columns}
          updateColumns={updateColumns}
          favouritesEnabled={favouritesEnabled}
          favourites={favourites}
          handleDeleteFavourite={handleDeleteFavourite}
          handleAddFavourite={handleAddFavourite}
          selectedFavouriteName={selectedFavouriteName}
          loadFavourite={loadFavourite}

          selection={selection}
          selectAll={this.selectAll}
          deselectAll={this.deselectAll}
          numSelected={numSelected}
          customActions={customActions}
        />
        <ErrorMessage
          error={error}
        />
        <DataRenderer
          data={data}
          meta={meta}
          columns={columns}
          updateSorting={updateSorting}
          selection={selection}
          select={selectItems}
          status={status}
          numSelected={numSelected}
          itemOnClick={itemOnClick}
        />
        { (totalCount / perPage) > 0 &&
          <Pagination
            page={currentPage}
            perPage={perPage}
            maxPages={maxPages}
            count={totalCount}
            goToPage={updatePage}
            loading={status === STATUS_CHOICES.loading}
            LoadingIcon={loadingSpinner}
            itemPluralName={itemPluralName}
          />
        }
      </div>
    )
  }
}

export default ObjectList
