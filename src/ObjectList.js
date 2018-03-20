import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ActionsFiltersContainer from './actions-filters/ActionsFiltersContainer'
import Table from './data-renderers/Table'
import {Pagination} from './pagination'
import {COLUMN_TYPE, FILTER_BASE_TYPE, META_TYPE, loadingSpinner} from './utils'

// TODO: rename to something awesome
class ObjectList extends Component {
  static propTypes = {
    /** the renderer used to display the data ie. list/table/custom */
    DataRenderer: PropTypes.func,
    /** the data to be displayed by the nmp-list */
    data: PropTypes.arrayOf(PropTypes.object),
    /** describe the data displayed. Used if it is a subset of a larger dataset */
    meta: META_TYPE,
    /** the maximum number of pages visible in the pagination navigation selection */
    maxPages: PropTypes.number,
    /** loading status used if data is loaded asynchronously  */
    status: PropTypes.oneOf(['loading', 'error', 'done']),
    /** provide the specific error details if there is an error */
    error: PropTypes.objectOf(Error),
    /** array of potential filters that can be displayed inside the npm-list */
    filters: PropTypes.arrayOf(PropTypes.shape({
      ...FILTER_BASE_TYPE,
      active: PropTypes.bool,
    })),
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
    /** the singular name of a specific item */
    itemSingleName: PropTypes.string,
    itemPluralName: PropTypes.string,
    /** If set, creates search filter with this key */
    searchKey: PropTypes.string,

    /** disable favourites when not required */
    favouritesEnabled: PropTypes.bool,
    /** the current list of favourites used for preferences */
    favourites: PropTypes.shape({
      list: PropTypes.array,
      onAdd: PropTypes.func,
      onDelete: PropTypes.func,
    }),
    /** the name of the currently selected favourite name */
    selectedFavouriteName: PropTypes.string,
    /** callback function when adding a new favourite */
    handleAddFavourite: PropTypes.func,
    /** callback function when deleting a favourite */
    handleDeleteFavourite: PropTypes.func,
    /** callback function to set the selected favourite to the current favourite */
    loadFavourite: PropTypes.func,

    /** IDs of currently selected items */
    selection: PropTypes.object,
    /** callback for when items are selected. Contains list of IDs, 'all', or null.
      Parent should use this to update `selection` prop
      */
    selectItems: PropTypes.func,
    /** Array of custom actions to be rendered */
    customActions: PropTypes.arrayOf(PropTypes.func),
  }

  static defaultProps = {
    status: 'done',
    DataRenderer: Table,
    data: [],
    columns: [],
    customActions: [],
    error: null,
    maxPages: 5,
    favouritesEnabled: true,
    meta: {},
    selection: {},
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
      DataRenderer, filters, addFilter, updateFilter, meta, status, searchKey,
      itemPluralName, itemSingleName, data, columns, updateColumns,
      favourites, handleDeleteFavourite, handleAddFavourite, favouritesEnabled,
      selectedFavouriteName, loadFavourite, maxPages, removeFilter,
      updatePage, updateSorting, selection, selectItems, customActions,
    } = this.props
    const { totalCount, perPage, currentPage } = meta
    // TODO: implement different display depending on this.props.status ie. loading etc.
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
          itemPluralName={itemPluralName}
          itemSingleName={itemSingleName}
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
          customActions={customActions}
        />
        <DataRenderer
          data={data}
          meta={meta}
          columns={columns}
          updateSorting={updateSorting}
          selection={selection}
          select={selectItems}
        />
        { (totalCount / perPage) > 0 &&
          <Pagination
            page={currentPage}
            perPage={perPage}
            maxPages={maxPages}
            count={totalCount}
            goToPage={updatePage}
            loading={status === 'loading'}
            LoadingIcon={loadingSpinner}
          />
        }
      </div>
    )
  }
}

export default ObjectList
