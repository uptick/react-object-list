import React from 'react'

// See https://allthingssmitty.com/2016/09/12/checking-if-font-awesome-loaded/
const IsFontAwesomeLoaded = (version) => {
  const prefix = version === 4 ? 'fa' : 'fas'
  const fontNames = version === 4
    ? ['FontAwesome', '"FontAwesome"']
    : ['"Font Awesome 5 Free"', '"Font Awesome 5 Pro"']
  let FontAwesomeLoaded = false
  const span = document.createElement('span')

  span.className = prefix
  span.style.display = 'none'
  document.body.insertBefore(span, document.body.firstChild)

  const css = (element, property) => window.getComputedStyle(element, null).getPropertyValue(property)

  if (!fontNames.includes(css(span, 'font-family'))) {
    console.warn(
      `Font Awesome ${version} was not detected but Font Awesome ${version} icons have been requested for \`react-object-list\``,
    )
  } else {
    FontAwesomeLoaded = true
  }
  document.body.removeChild(span)
  return FontAwesomeLoaded
}

const FontAwesomeIcons = (majorVersion = 4) => {
  switch (majorVersion) {
    case 4:
      IsFontAwesomeLoaded(4)
      return {
        OptionalFields: <i className="fa fa-list" aria-hidden="true" />,
        Favourites: <i className="fa fa-heart-o" aria-hidden="true" />,
        RemoveFavourite: <i className="fa fa-minus-circle" aria-hidden="true" />,
        RemoveFilter: <i className="fa fa-trash-o" aria-hidden="true" />,
        DropdownOpen: <i className="fa fa-caret-down" aria-hidden="true" />,
        DropdownClose: <i className="fa fa-caret-up" aria-hidden="true" />,
        SortAsc: <i className="fa fa-caret-up" aria-hidden="true" />,
        SortDesc: <i className="fa fa-caret-down" aria-hidden="true" />,
        Unsorted: <i className="fa fa-sort" aria-hidden="true" />,
        Loading: <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true" />,
        CheckboxChecked: <i className="fa fa-check-square-o" aria-hidden="true" />,
        CheckboxUnchecked: <i className="fa fa-square-o" aria-hidden="true" />,
      }
    case 5:
      IsFontAwesomeLoaded(5)
      return {
        OptionalFields: <i className="fas fa-list" aria-hidden="true" />,
        Favourites: <i className="far fa-heart" aria-hidden="true" />,
        RemoveFavourite: <i className="far fa-minus-circle" aria-hidden="true" />,
        RemoveFilter: <i className="far fa-trash-o" aria-hidden="true" />,
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
        'Accepted versions are: 4, 5',
        'Please make an issue in `react-object-list` to fix this.'
      )
  }
}

export default FontAwesomeIcons
