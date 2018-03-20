import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableHeader from './TableHeader'
import {AllSelector, Selector} from '../types'
import { getVisibleColumns, setColumnLabels } from '../utils/functions'
import { DATA_TYPE } from '../utils/constants'

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
    selection: PropTypes.object,
    /** Function to select one */
    select: PropTypes.func,
  }

  static defaultProps = {
    meta: {
      extraColumns: [],
      sortKeys: [],
    },
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
      const selected = row.id in selection
      return (
        <tr key={`row-${rowIndex}`} className="apilist-table__row">
          {select && (
            <td className="apilist-table__td">
              <Selector
                toggleSelect={select}
                selected={selected}
                id={row.id}
              />
            </td>
          )}
          {this.state.columns.map((column, cellIndex) => {
            const toRender = Array.isArray(column) ? column : [column]
            return (
              <td key={`${rowIndex}-${cellIndex}`} className="apilist-table__td">
                {toRender.map(RenderItem => {
                  if (RenderItem.item) {
                    return RenderItem.item({
                      row: row,
                      column: RenderItem,
                      value: row[RenderItem.dataKey],
                    })
                  }
                  return row[RenderItem.dataKey]
                }
                ).join(' ')}
              </td>
            )
          })}
        </tr>
      )
    })
  }

  render() {
    const {selection, data, select} = this.props
    return (
      <div className="apilist-table--scroll">
        <table className="apilist-table">
          <thead>
            <tr>
              {select && (
                <th className="apilist-table__th apilist-table__th--selector">
                  <AllSelector
                    allSelected={Object.keys(selection).length >= data.length}
                    toggleSelectAll={() => select(data.map(row => row.id))}
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
