import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableHeader from './TableHeader'
import Overlay from './Overlay'
import {AllSelector, Selector} from '../types'
import { getVisibleColumns, setColumnLabels } from '../utils/functions'
import { DATA_TYPE } from '../utils/constants'
import { STATUS_TYPE, STATUS_CHOICES, SELECTION_TYPE, ALL_SELECTED } from '../utils/proptypes'

export default class TableRenderer extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.oneOfType([DATA_TYPE, PropTypes.arrayOf(DATA_TYPE)])),
    meta: PropTypes.object,
    saveColumnWidth: PropTypes.func,
    data: PropTypes.array,
    /** eg. { label: {width: "100"} } where 'label' is the label generated for the column */
    columnWidths: PropTypes.object,
    /** set the sort to the given sortkeys */
    updateSorting: PropTypes.func,
    /** IDs of currently selected items set to true if selected */
    selection: SELECTION_TYPE,
    /** Function to select one */
    select: PropTypes.func,
    /** loading status used if data is loaded asynchronously  */
    status: STATUS_TYPE,
    /** Count of selected items */
    numSelected: PropTypes.number,
  }

  static defaultProps = {
    meta: {
      extraColumns: [],
      sortKeys: [],
    },
    status: STATUS_CHOICES.done,
    columnWidths: {},
    selection: {},
  }

  state = {
    columns: getVisibleColumns(setColumnLabels(this.props.columns), this.props.meta.extraColumns),
  }

  componentWillReceiveProps(nextProps) {
    // TODO: optimise performance and only do this if the columns prop has changed
    this.setState(() => ({columns: getVisibleColumns(setColumnLabels(nextProps.columns), nextProps.meta.extraColumns)}))
  }

  _renderHeaderRowHelper = () => {
    return this.state.columns.map(column => {
      const label = Array.isArray(column) ? column[0].label : column.label
      const width = this.props.columnWidths[label] ? this.props.columnWidths[label].width : null
      return (
        <TableHeader
          key={`header-${label}`}
          headerItems={column}
          label={label}
          width={width || column.width}
          sortKeys={this.props.meta.sortKeys}
          saveWidth={this.props.saveColumnWidth}
          updateSorting={this.props.updateSorting}
        />
      )
    })
  }

  _renderItemRowsHelper = () => {
    const {data, selection, select} = this.props
    return data.map((row, rowIndex) => {
      const selected = selection === ALL_SELECTED || row.id in selection
      return (
        <tr key={`row-${rowIndex}`} className="objectlist-table__row">
          {select && (
            <td className="objectlist-table__td" key={`select-cell-${rowIndex}`} >
              <Selector
                toggleSelect={select}
                selected={selected}
                id={row.id}
              />
            </td>
          )}
          {this.state.columns.map((column, cellIndex) => {
            const toRender = Array.isArray(column) ? column : [column]
            const RenderedItems = []
            let i = 0
            while (i < toRender.length) {
              if (i > 0) {
                RenderedItems.push(<br key={`spacer-${i}`} />)
              }
              const RenderItem = toRender[i]
              if (RenderItem.item) {
                RenderedItems.push(RenderItem.item({
                  row: row,
                  column: RenderItem,
                  value: row[RenderItem.dataKey],
                  key: `item-${i}`,
                }))
              } else {
                RenderedItems.push(row[RenderItem.dataKey])
              }
              i++
            }
            return (
              <td key={`cell-${rowIndex}-${cellIndex}`} className="objectlist-table__td">
                {RenderedItems}
              </td>
            )
          })}
        </tr>
      )
    })
  }

  handleToggleSelectAll = () => {
    this.props.select(this.props.data.map(row => row.id))
  }

  render() {
    const {data, select, numSelected, status} = this.props
    return (
      <div className="objectlist-table--scroll">
        <Overlay status={status} />
        <table className="objectlist-table">
          <thead>
            <tr>
              {select && (
                <th className="objectlist-table__th objectlist-table__th--selector">
                  <AllSelector
                    allSelected={!!(numSelected && numSelected >= data.length)}
                    toggleSelectAll={this.handleToggleSelectAll}
                  />
                </th>
              )}
              {this._renderHeaderRowHelper()}
            </tr>
          </thead>
          <tbody>
            {this._renderItemRowsHelper()}
          </tbody>
        </table>
      </div>
    )
  }
}
