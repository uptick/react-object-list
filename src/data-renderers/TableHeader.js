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

  constructor(props) {
    super(props)

    let label = props.label
    if (!label) {
      let headerItem = props.headerItems
      if (Array.isArray(props.headerItems)) {
        headerItem = props.headerItems[0]
      }
      if (headerItem) {
        label = headerItem.dataKey.split('.').pop()
      }
    }

    const headerItems = Array.isArray(props.headerItems) ? props.headerItems : [props.headerItems]
    const width = (headerItems[0] || {}).width

    this.state = {
      label,
      headerItems,
      width,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.headerItems !== nextProps.headerItems) {
      this.setState({
        headerItems: Array.isArray(nextProps.headerItems) ? nextProps.headerItems : [nextProps.headerItems],
      })
    }
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
    const headers = this.state.headerItems.map((header, i) => (
      <HeaderField
        key={`headerfield-${i}`}
        activeSort={this.getSortDirection(header.sortKey)}
        updateSorting={this.props.updateSorting}
        {...header}
      />
    ))
    let widthHandle
    if (this.state.width && this.props.saveWidth) {
      widthHandle = (
        <WidthHandle
          onChange={this.setWidth}
          onSave={this.saveWidth}
        />
      )
    }

    return (
      <th width={this.state.width} className={`objectlist-table__th ${this.props.className}`}>
        { headers }
        { widthHandle }
      </th>
    )
  }
}
