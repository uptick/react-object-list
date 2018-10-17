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
        OptionalFields: <i className="fa fa-list" />,
        Favourites: <i className="fa fa-heart-o" />,
        RemoveFavourite: <i className="fa fa-minus-circle" />,
        RemoveFilter: <i className="fa fa-trash-o" />,
        DropdownOpen: <i className="fa fa-caret-down" />,
        DropdownClose: <i className="fa fa-caret-up" />,
        SortAsc: <i className="fa fa-caret-up" />,
        SortDesc: <i className="fa fa-caret-down" />,
        Unsorted: <i className="fa fa-sort" />,
        Loading: <i className="fa fa-circle-o-notch fa-spin" />,
      }
    case 5:
      IsFontAwesomeLoaded(5)
      return {
        OptionalFields: <i className="fas fa-list" />,
        Favourites: <i className="far fa-heart" />,
        RemoveFavourite: <i className="far fa-minus-circle" />,
        RemoveFilter: <i className="far fa-trash-o" />,
        DropdownOpen: <i className="fas fa-caret-down" />,
        DropdownClose: <i className="fas fa-caret-up" />,
        SortAsc: <i className="fas fa-caret-up" />,
        SortDesc: <i className="fas fa-caret-down" />,
        Unsorted: <i className="fas fa-sort" />,
        Loading: <i className="fas fa-circle-notch fa-spin" />,
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
