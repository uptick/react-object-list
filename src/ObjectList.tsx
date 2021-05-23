/* eslint-disable react/prop-types */
import React from 'react'

import ActionsFiltersContainer from './actions-filters/ActionsFiltersContainer'
import Table from './data-renderers/Table'

import { Pagination as DefaultPagination } from './pagination'
import { ErrorMessage as DefaultErrorMessage } from './utils'

import {
  STATUS_CHOICES,
} from './utils/proptypes'

import type { ReactObjectList } from '.'

const ObjectList : React.FC<ReactObjectList> = (props) => {
  const {
    DataRenderer,
    Pagination,
    ErrorMessage,
    data,
    filters,
    icons,
    addFilter,
    updateFilter,
    removeFilter,
    meta,
    status,
    searchKey,
    itemSingleName,
    itemPluralName,
    columns,
    updateColumns,
    favouritesEnabled,
    favourites,
    handleDeleteFavourite,
    handleAddFavourite,
    selectedFavouriteName,
    loadFavourite,
    selection,
    selectItems,
    numSelected,
    customActions,
    selectStyles,
    error,
    summaryData,
    updateSorting,
    itemOnClick,
    maxPages,
    updatePage,
  } = props

  const { totalCount, perPage, currentPage } = meta

  function onSelection(message: 'all' | null) {
    if (selectItems) {
      selectItems(message)
    }
  }

  return (
    <div>
      <ActionsFiltersContainer
        filters={filters}
        icons={icons}
        addFilter={addFilter}
        updateFilter={updateFilter}
        removeFilter={removeFilter}
        meta={meta}
        status={status}
        searchKey={searchKey}
        itemSingleName={itemSingleName}
        itemPluralName={itemPluralName || `${itemSingleName}s`}
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
        selectAll={() => onSelection('all')}
        deselectAll={() => onSelection(null)}
        numSelected={numSelected}
        customActions={customActions}
        selectStyles={selectStyles}
      />

      <ErrorMessage error={error} />

      <DataRenderer
        data={data}
        summaryData={summaryData}
        icons={icons}
        meta={meta}
        columns={columns}
        updateSorting={updateSorting}
        selection={selection}
        select={selectItems}
        status={status}
        numSelected={numSelected}
        itemOnClick={itemOnClick}
      />

      {totalCount / perPage > 0 && (
        <Pagination
          page={currentPage}
          perPage={perPage}
          maxPages={maxPages}
          count={totalCount}
          goToPage={updatePage}
          loading={status === STATUS_CHOICES.loading}
          LoadingIcon={icons.Loading}
          itemPluralName={itemPluralName || `${itemSingleName}s`}
        />
      )}

    </div>
  )
}

ObjectList.defaultProps = {
  status: STATUS_CHOICES.done,
  DataRenderer: Table,
  Pagination: DefaultPagination,
  ErrorMessage: DefaultErrorMessage,
  data: [],
  icons: {},
  columns: [],
  customActions: [],
  error: null,
  maxPages: 5,
  favouritesEnabled: true,
  meta: {},
  selection: {},
  itemSingleName: 'item',
  selectStyles: {},
}

export default ObjectList
