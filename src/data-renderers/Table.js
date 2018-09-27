import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import TableHeader from './TableHeader'
import Overlay from './Overlay'
import AllSelector from '../types/AllSelector'
import Selector from '../types/Selector'
import { getVisibleColumns, annotateSpans, getLeafColumns } from '../utils/functions'
import { getValueFromAccessor, handleRowClick } from './utils'
import { STATUS_TYPE, STATUS_CHOICES, SELECTION_TYPE, ALL_SELECTED } from '../utils/proptypes'

export default class TableRenderer extends Component {
  static propTypes = {
    columns: PropTypes.array,
    meta: PropTypes.object,
    saveColumnWidth: PropTypes.func,
    data: PropTypes.array,
    summaryData: PropTypes.object,
    /** eg. { label: {width: "100"} } where 'label' is the label generated for the column */
    columnWidths: PropTypes.object,
    /** set the sort to the given sortkeys */
    updateSorting: PropTypes.func,
    /** IDs of currently selected items set to true if selected */
    selection: SELECTION_TYPE,
    /** Function to select one ID or an array of IDs */
    select: PropTypes.func,
    /** loading status used if data is loaded asynchronously  */
    status: STATUS_TYPE,
    /** Count of selected items */
    numSelected: PropTypes.number,
    /** Function called when table row is clicked */
    itemOnClick: PropTypes.func,
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
    columns: getVisibleColumns(this.props.columns, this.props.meta.extraColumns),
  }

  componentWillReceiveProps(nextProps) {
    // TODO: optimise performance and only do this if the columns prop has changed
    this.setState(() => ({
      columns: getVisibleColumns(nextProps.columns, nextProps.meta.extraColumns),
    }))
  }

  renderHeader = () => {
    const {columns} = this.state
    const {select, numSelected, data} = this.props

    annotateSpans(columns) // re-annotate the correct colSpans and rowSpans to render
    const rows = this._renderHeaderRowHelper(columns)
    if (select && rows.length) {
      rows[0].unshift(
        <th rowSpan={rows.length} key="all-selector" className="objectlist-table__th objectlist-table__th--border-bottom objectlist-table__th--selector">
          <AllSelector
            numSelected={numSelected}
            total={data.length}
            selectAll={this.handleSelectAll}
            deselectAll={this.handleDeselectAll}
          />
        </th>
      )
    }

    return (
      <thead className={rows.length > 1 ? 'objectlist-table__thead--grouped-headers' : ''}>
        {rows.map((row, index) => <tr key={`header-row-${index}`}>{row}</tr>)}
      </thead>
    )
  }

  _renderHeaderRowHelper = (columns) => {
    let currentRow = [...columns]
    let nextRow = []
    const rows = []
    let rowIndex = -1
    if (currentRow.length) {
      rows.push([])
      rowIndex++
    }
    let index = 0

    while (currentRow.length) {
      const header = currentRow.shift()
      if (header.hasOwnProperty('columns')) {
        nextRow = nextRow.concat(header.columns)
        rows[rowIndex].push(
          <th className={`objectlist-table__th`} key={`grouped-header-${header.fieldKey}`} colSpan={header._colSpan}>
            {header.header}
          </th>
        )
      } else {
        const label = Array.isArray(header) ? header[0].label : header.label
        const width = this.props.columnWidths[label] ? this.props.columnWidths[label].width : null
        rows[rowIndex].push(
          <TableHeader
            key={`header-${label}-${index}`}
            headerItems={header}
            label={label}
            width={width || header.width}
            rowSpan={header._rowSpan}
            sortKeys={this.props.meta.sortKeys}
            saveWidth={this.props.saveColumnWidth}
            updateSorting={this.props.updateSorting}
          />
        )
      }
      // move to the next row to render
      if (!currentRow.length) {
        currentRow = nextRow
        nextRow = []
        if (currentRow.length) {
          rows.push([])
          rowIndex++
        }
      }
      index++
    }
    return rows
  }

  _renderItemRowsHelper = (columns) => {
    const {data, selection, select, itemOnClick} = this.props
    const rowClasses = ['objectlist-table__row']
    if (itemOnClick) rowClasses.push('objectlist-table__row--clickable')
    return data.map((row, rowIndex) => {
      const selected = selection === ALL_SELECTED || row.id in selection
      // add row-specific classes defined in columns
      const rowClassesFromColumns = []
      const getRowClass = column => {
        if (Array.isArray(column)) { column.forEach(col => getRowClass(col)) }
        if (!column.rowClass) return
        if (typeof column.rowClass === 'function') { rowClassesFromColumns.push(column.rowClass(row)) }
        if (typeof column.rowClass === 'string') { rowClassesFromColumns.push(column.rowClass) }
      }
      columns.forEach(column => getRowClass(column))
      return (
        <tr
          key={`row-${rowIndex}`}
          className={ClassNames(rowClasses.concat(rowClassesFromColumns))}
          onClick={itemOnClick ? event => handleRowClick(event, row, itemOnClick) : null}
        >
          {select && (
            <td className="objectlist-table__td" key={`select-cell-${rowIndex}`} >
              <Selector
                toggleSelect={select}
                selected={selected}
                id={row.id}
              />
            </td>
          )}
          {columns.map((column, cellIndex) => {
            const toRender = Array.isArray(column) ? column : [column]
            const RenderedItems = []
            let i = 0
            while (i < toRender.length) {
              const RenderItem = toRender[i]
              if (RenderItem.item) {
                RenderedItems.push(RenderItem.item({
                  row: row,
                  column: RenderItem,
                  value: getValueFromAccessor(row, RenderItem.dataKey),
                  key: `item-${i}`,
                }))
              } else {
                RenderedItems.push(getValueFromAccessor(row, RenderItem.dataKey))
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

  renderSummaryRow = (columns, key) => {
    const {summaryData, select} = this.props
    if (!summaryData) return null

    return (
      <tr
        key={`row-summary-${key}`}
        className="objectlist-table__row--summary"
      >
        {select && <td className="objectlist-table__td">-</td>}
        {columns.map((column, cellIndex) => {
          const toRender = Array.isArray(column) ? column : [column]
          const {summary, item} = toRender[0]
          let renderedItem = summary ? getValueFromAccessor(summaryData, summary) : null
          if (renderedItem && item) {
            renderedItem = item({
              row: summaryData,
              column: toRender[0],
              value: renderedItem,
              key: `summary-item`,
            })
          }
          return <td key={`cell-summary-${cellIndex}`} className="objectlist-table__td">{renderedItem || '-'}</td>
        })}
      </tr>
    )
  }

  handleSelectAll = () => {
    const {data, select, selection} = this.props
    select(data.map(row => row.id).filter(id => !(id in selection)))
  }

  handleDeselectAll = () => {
    this.props.select(null)
  }

  render() {
    const {status} = this.props
    const leafColumns = getLeafColumns(this.state.columns)
    return (
      <div className="objectlist-table--scroll">
        <Overlay status={status} />
        <table className="objectlist-table">
          {this.renderHeader()}
          <tbody>
            {this.renderSummaryRow(leafColumns, 0)}
            {this._renderItemRowsHelper(leafColumns)}
            {this.renderSummaryRow(leafColumns, 1)}
          </tbody>
        </table>
      </div>
    )
  }
}
