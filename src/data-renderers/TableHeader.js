import React from 'react'
import PropTypes from 'prop-types'
import HeaderField from './HeaderField'
import WidthHandle from './WidthHandle'
import {COLUMN_TYPE} from '../utils/proptypes'

/**
 * An individual header for a column containing a HeaderField for display
 * and an optional WidthHandle to resize the column width
 */
export default class TableHeader extends React.Component {
  static propTypes = {
    /**
     * the HeaderFields that is to be displayed within this TableHeader
     * array of objects eg. [{name: 'Property', sortKey: 'name', className: ''}]
     * when empty the other props will be used to generate a single HeaderField
     */
    headerItems: PropTypes.oneOfType([PropTypes.arrayOf(COLUMN_TYPE), COLUMN_TYPE]).isRequired,
    saveWidth: PropTypes.func,
    label: PropTypes.string,
    /** callback function for the objectlist to set the active sorting of the data */
    updateSorting: PropTypes.func,
    sortKeys: PropTypes.arrayOf(PropTypes.shape({
      sortKey: PropTypes.string,
      value: PropTypes.bool,
    })),
    /** class to apply to the th element of the header */
    className: PropTypes.string,
  }

  static defaultProps = {
    headerItems: [],
    className: '',
    sortKeys: [],
  }

  state = {
    headerItems: [],
  }

  static getDerivedStateFromProps(props, state) {
    const {headerItems, label, width} = props
    const stateChanges = {}
    if (headerItems !== state.headerItems) {
      stateChanges.headerItems = headerItems
    }
    const firstHeader = Array.isArray(headerItems) ? headerItems[0] : headerItems
    if (label !== state.label) {
      stateChanges.label = props.label || (firstHeader ? firstHeader.dataKey.split('.').pop() : null)
    }
    if (width !== state.width) {
      stateChanges.width = firstHeader ? firstHeader.width : null || state.width
    }
    if (Object.keys(stateChanges).length) return stateChanges
    return null
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.width !== this.state.width ||
      nextProps.className !== this.props.className ||
      this.props.sortKeys !== nextProps.sortKeys ||
      this.state.headerItems !== nextState.headerItems
    )
  }

  /**
   * Callback function used to set the width for this column
   */
  setWidth = (width) => {
    this.setState(prevState => {
      const newWidth = prevState.width + parseInt(width)
      return {
        width: (newWidth >= 20) ? newWidth : prevState.width,
      }
    })
  }

  /**
   * Save the preferred column width to user preferences
   */
  saveWidth = () => {
    this.props.saveWidth(this.state.label, this.state.width)
  }

  /**
   *
   * @returns {bool} - true for ascending, false for descending, null for no sort
   */
  getSortDirection = key => {
    const direction = this.props.sortKeys.find(sortKey => sortKey.sortKey === key)
    return (direction === undefined) ? null : direction.value
  }

  render() {
    const {headerItems, width} = this.state
    const arrayOfHeaderItems = Array.isArray(headerItems) ? headerItems : [headerItems]
    const headers = arrayOfHeaderItems.map((header, i) => (
      <HeaderField
        key={`headerfield-${i}`}
        activeSort={this.getSortDirection(header.sortKey)}
        updateSorting={this.props.updateSorting}
        {...header}
      />
    ))
    let widthHandle
    if (width && this.props.saveWidth) {
      widthHandle = (
        <WidthHandle
          onChange={this.setWidth}
          onSave={this.saveWidth}
        />
      )
    }

    return (
      <th width={width} className={`objectlist-table__th ${this.props.className}`}>
        { headers }
        { widthHandle }
      </th>
    )
  }
}
