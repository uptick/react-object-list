import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

/**
 * Component used to display one page number
 */
export default class Page extends React.PureComponent {
  static propTypes = {
    // This page's number
    page: PropTypes.number.isRequired,
    // True this page is active
    active: PropTypes.bool,
    // True this page is disabled
    disabled: PropTypes.bool,
    // Function to call to change page
    goToPage: PropTypes.func.isRequired,
    // Label to display page with
    label: PropTypes.string,
  }

  /**
   * Handles click event and calls function
   * to go to that page
   * @param  {MouseEvent} event onClick event
   */
  handlePageClick = event => {
    event.preventDefault()
    const {goToPage, page} = this.props
    goToPage(page)
  }

  render() {
    const {page, active, disabled, label} = this.props
    return (
      <li
        key={`page-${page}`}
        className={ClassNames('objectlist-pagination__page', {
          active: active && !disabled,
          disabled: disabled,
        })}
        onClick={this.handlePageClick}
      >
        <a className="objectlist-pagination__page--link" href="#">
          {label || page.toLocaleString()}
        </a>
      </li>
    )
  }
}
