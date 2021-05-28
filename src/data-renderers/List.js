import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import ListCard from './ListCard'
import Overlay from './Overlay'
import { getVisibleColumns } from '../utils'
import { handleRowClick } from './utils'
import { STATUS_TYPE, STATUS_CHOICES, COLUMN_TYPE } from '../utils/proptypes'

export default class ListRenderer extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.oneOfType([COLUMN_TYPE, PropTypes.arrayOf(COLUMN_TYPE)])),
    data: PropTypes.array,
    meta: PropTypes.object,
    // Custom component to be passed to render the list items
    Renderer: PropTypes.func,
    // Extra classes for the Renderer component to be rendered with
    extraClasses: PropTypes.string,
    /** loading status used if data is loaded asynchronously  */
    status: STATUS_TYPE,
    /** Function called when table row is clicked */
    itemOnClick: PropTypes.func,
  }

  static defaultProps = {
    meta: {
      extraColumns: [],
      sortKeys: [],
    },
    columns: [],
    data: [],
    Renderer: ListCard,
    status: STATUS_CHOICES.done,
  }

  constructor(props) {
    super(props)
    this.state = {
      columns: getVisibleColumns(this.props.columns, this.props.meta.extraColumns),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({columns: getVisibleColumns(nextProps.columns, nextProps.meta.extraColumns)}))
  }

  renderListRows = () => {
    const {Renderer, data, itemOnClick} = this.props
    return data.map((row, idx) => {
      return (
        <Renderer
          key={`list-row-${idx}`}
          columns={this.state.columns}
          data={row}
          onClick={itemOnClick ? (event) => handleRowClick(event, row, itemOnClick) : null}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <Overlay status={this.props.status} />
        <ul className={ClassNames('objectlist-list__list', this.props.extraClasses)}>
          {this.renderListRows()}
        </ul>
      </div>
    )
  }
}
