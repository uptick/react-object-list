export type ReactObjectListIcon = {
    OptionalFields?: HTMLElement
    Favourites?: HTMLElement
    RemoveFavourite?: HTMLElement
    RemoveFilter?: HTMLElement
    DropdownOpen?: HTMLElement
    DropdownClose?: HTMLElement
    SortAsc?: HTMLElement
    SortDesc?: HTMLElement
    Unsorted?: HTMLElement
    Loading?: HTMLElement
    CheckboxChecked?: HTMLElement
    CheckboxUnchecked?: HTMLElement
  }

export type ReactObjectList = {
    DataRenderer: any
    Pagination: any
    ErrorMessage: any
    /** array of potential filters that can be displayed inside the object-list */
    filters: any
     /** callback to add a filter to the list of active filters */
    addFilter: () => void
    /** callback containing the new filter {filterKey, comparison, value} */
    updateFilter: () => void
    /** describe the data displayed. Used if it is a subset of a larger dataset */
    meta: any
    /** loading status used if data is loaded asynchronously  */
    status: any
    /** If set, creates search filter with this key */
    searchKey: string
    data: object[]
    /** the columns to render, use an array with objects. Objects containing 'columns' will be treated as a header group */
    columns: []
    /** callback function when toggling an extra column on or off */
    updateColumns: () => void
    /** function called when a datapoint's representation is clicked on **/
    itemOnClick: () => void
     /** Icons to be rendered across the component */
    icons: ReactObjectListIcon
    /** the current list of favourites used for preferences */
    favourites: any
    handleDeleteFavourite: () => void
    handleAddFavourite: () => void
    /** disable favourites when not required */
    favouritesEnabled: boolean
    loadFavourite: () => void
    /** the maximum number of pages visible in the pagination navigation selection */
    maxPages: number
    /** callback to remove a filter from the active list of filters */
    removeFilter: () => void
    /** callback containing the new page number */
    updatePage: () => void
     /** the name of a specific item, leave itemPluralName blank if it's just itemSingleName + 's' */
    updateSorting: () => void
    selection: any
    /** callback for when items are selected. Takes as argument a list of IDs, a single ID,
       'all', or null.  Parent should use this to update `selection` prop
        */
    selectItems: (message: string | null) => void
    customActions: []
    /** provide the specific error details if there is an error */
    error: any
    summaryData: object
     /** Object of custom react-select styles */
    selectStyles: object
    itemSingleName: string
    itemPluralName: string
    selectedFavouriteName: any
    numSelected: any
  }
