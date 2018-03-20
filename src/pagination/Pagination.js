import React from 'react'
import PropTypes from 'prop-types'
import Page from './Page'

/**
 * Component used to display/control pagination
 */
export default class Pagination extends React.Component {
  static propTypes = {
    // Initial page of results
    page: PropTypes.number,
    // Number of items to display per page
    perPage: PropTypes.number,
    // Maximum number of pages to display
    maxPages: PropTypes.number,
    // Total number of results
    count: PropTypes.number,
    // Function to call to change page
    goToPage: PropTypes.func.isRequired,
    // True if results are loading
    loading: PropTypes.bool,
    // Icon to display if results are loading
    LoadingIcon: PropTypes.func,
    // plural name for items displayed in the list
    itemPluralName: PropTypes.string,
  }

  static defaultProps = {
    page: 1,
    perPage: 50,
    maxPages: 10,
  }

  render() {
    const {page, maxPages, count, perPage, loading, LoadingIcon, goToPage, itemPluralName} = this.props
    const pages = []
    let totalPages = 0
    const minPage = Math.min(
      Math.ceil(page - (maxPages / 2)),
      Math.ceil(count / perPage) - maxPages + 1
    )
    for (let position = 0; position < count; position += perPage) {
      const pageIndex = Math.floor(position / perPage) + 1
      totalPages++
      if (pageIndex < minPage) { continue }
      if (pages.length >= maxPages) { continue }
      pages.push(
        <Page
          key={`page-${pageIndex}`}
          page={pageIndex}
          active={pageIndex === page}
          goToPage={goToPage}
        />
      )
    }
    if (totalPages === 1) return null
    const prevPage = Math.max(Math.min(totalPages, page - 1), 1)
    const prevLink = (
      <Page
        key="page-prev"
        page={prevPage}
        active={false}
        disabled={page === prevPage}
        label="←&nbsp;Previous"
        goToPage={goToPage}
      />
    )

    const nextPage = Math.max(Math.min(totalPages, page + 1), 1)
    const nextLink = (
      <Page
        key="page-next"
        page={nextPage}
        active={false}
        disabled={page === totalPages}
        label="Next&nbsp;→"
        goToPage={goToPage}
      />
    )
    let totals
    if (!loading) {
      totals = (
        <p className="text-muted">
          <em>
            {`Showing page ${page} of ${Math.max(totalPages, 1)} out of ${count} total ${itemPluralName || 'records'}.`}
          </em>
        </p>
      )
    } else {
      totals = (
        <p className="text-muted">
          <em>
            {LoadingIcon && <LoadingIcon />} Loading {itemPluralName || 'results'} ...
          </em>
        </p>
      )
    }
    return (
      <div className="apilist-pagination">
        <ul className="apilist-pagination__pages">
          {prevLink}
          {pages}
          {nextLink}
        </ul>
        {totals}
      </div>
    )
  }
}
