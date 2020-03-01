import React from 'react'

const FontAwesomeIcons = (majorVersion = 5) => {
  switch (majorVersion) {
    case 5:
      return {
        OptionalFields: <i className="fas fa-list" aria-hidden="true" />,
        Favourites: <i className="far fa-heart" aria-hidden="true" />,
        RemoveFilter: <i className="fas fa-minus-circle" aria-hidden="true" />,
        RemoveFavourite: <i className="far fa-trash-alt" aria-hidden="true" />,
        DropdownOpen: <i className="fas fa-caret-down" aria-hidden="true" />,
        DropdownClose: <i className="fas fa-caret-up" aria-hidden="true" />,
        SortAsc: <i className="fas fa-caret-up" aria-hidden="true" />,
        SortDesc: <i className="fas fa-caret-down" aria-hidden="true" />,
        Unsorted: <i className="fas fa-sort" aria-hidden="true" />,
        Loading: <i className="fas fa-circle-notch fa-spin" aria-hidden="true" />,
        CheckboxChecked: <i className="far fa-check-square" aria-hidden="true" />,
        CheckboxUnchecked: <i className="far fa-square" aria-hidden="true" />,
      }
    default:
      console.warn(
        `Could not find config for version ${majorVersion}`,
        'Accepted versions are: 5',
        'Please make an issue in `react-object-list` to fix this.'
      )
  }
}

export default FontAwesomeIcons
