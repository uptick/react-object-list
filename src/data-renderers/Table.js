import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableHeader from './TableHeader'
import Overlay from './Overlay'
import AllSelector from '../types/AllSelector'
import Selector from '../types/Selector'
import { getVisibleColumns, setColumnLabels } from '../utils/functions'
import { getValueFromAccessor } from './utils'
import {
  STATUS_TYPE,
  STATUS_CHOICES,
  SELECTION_TYPE,
  ALL_SELECTED,
  COLUMN_TYPE,
  COLUMN_GROUP_TYPE,
} from '../utils/proptypes'

export default class TableRenderer extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.oneOfType(
        [COLUMN_TYPE, PropTypes.arrayOf(COLUMN_TYPE), COLUMN_GROUP_TYPE]
      )
    ),
    meta: PropTypes.object,
    saveColumnWidth: PropTypes.func,
    data: PropTypes.array,
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
    this.setState(() => ({columns: getVisibleColumns(nextProps.columns, nextProps.meta.extraColumns)}))
  }

  _renderHeaderRowHelper = (hasGroupedColumns) => {
    const {columns: visibleColumns} = this.state
    const {columnWidths, meta, saveColumnWidth, updateSorting, columns} = this.props
    const labelledColumns = setColumnLabels(columns)
    const getWidth = label => columnWidths[label] ? columnWidths[label].width : null
    return labelledColumns.filter(({fieldKey}) => visibleColumns.includes(fieldKey)).map(column => {
      const label = Array.isArray(column) ? column[0].label : column.label
      const width = getWidth(label) || column.width
      return (
        <TableHeader
          key={`header-${label}`}
          headerItems={column}
          label={label}
          width={width}
          sortKeys={meta.sortKeys}
          saveWidth={saveColumnWidth}
          updateSorting={updateSorting}
          rowSpan={(hasGroupedColumns && !('columns' in column)) ? 2 : 1}
          colSpan={('columns' in column) ? column.columns.length : 1}
        />
      )
    })
  }

  _renderSubHeaderRowHelper = () => {
    const {columns: visibleColumns} = this.state
    const {columnWidths, meta, saveColumnWidth, updateSorting, columns} = this.props
    const getWidth = label => columnWidths[label] ? columnWidths[label].width : null
    return columns.filter(({fieldKey}) => visibleColumns.includes(fieldKey)).map(column => {
      if ('columns' in column) {
        return column.columns.map(subColumn => {
          const label = Array.isArray(subColumn) ? subColumn[0].label : subColumn.label
          const width = getWidth(label) || subColumn.width
          return (
            <TableHeader
              key={`subheader-${label}`}
              headerItems={subColumn}
              label={label}
              width={width}
              sortKeys={meta.sortKeys}
              saveWidth={saveColumnWidth}
              updateSorting={updateSorting}
              rowSpan={1}
              colSpan={1}
            />
          )
        })
      }
    })
  }

  _renderItemRowsHelper = () => {
    const {columns: visibleColumns} = this.state
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
          {this.props.columns.filter(({fieldKey}) => visibleColumns.includes(fieldKey)).map((column, cellIndex) => {
            const renderContent = col => {
              const toRender = Array.isArray(col) ? col : [col]
              const RenderedItems = []
              let i = 0
              while (i < toRender.length) {
                const RenderItem = toRender[i]
                if (RenderItem.item) {
                  RenderedItems.push(RenderItem.item({
                    row: row,
                    column: RenderItem,
                    value: 'dataKey' in RenderItem ? getValueFromAccessor(row, RenderItem.dataKey) : null,
                    key: `item-${i}`,
                  }))
                } else {
                  RenderedItems.push('dataKey' in RenderItem ? getValueFromAccessor(row, RenderItem.dataKey) : null)
                }
                i++
              }
              return (
                <td key={`cell-${rowIndex}-${cellIndex}`} className="objectlist-table__td">
                  {RenderedItems}
                </td>
              )
            }
            if ('columns' in column) {
              return column.columns.map(col => renderContent(col))
            }
            return renderContent(column)
          })}
        </tr>
      )
    })
  }

  handleSelectAll = () => {
    const {data, select, selection} = this.props
    select(data.map(row => row.id).filter(id => !(id in selection)))
  }

  handleDeselectAll = () => {
    this.props.select(null)
  }

  render() {
    const {select, status, numSelected, data, columns} = this.props
    const {columns: visibleColumns} = this.state
    const hasGroupedColumns = columns.filter(
      ({fieldKey}) => visibleColumns.includes(fieldKey)
    ).some(
      column => 'columns' in column
    )
    return (
      <div className="objectlist-table--scroll">
        <Overlay status={status} />
        <table className="objectlist-table">
          <thead>
            <tr>
              {select && (
                <th className="objectlist-table__th objectlist-table__th--selector">
                  <AllSelector
                    numSelected={numSelected}
                    total={data.length}
                    selectAll={this.handleSelectAll}
                    deselectAll={this.handleDeselectAll}
                  />
                </th>
              )}
              {this._renderHeaderRowHelper(hasGroupedColumns)}
            </tr>
            {hasGroupedColumns && (
              <tr>
                {this._renderSubHeaderRowHelper()}
              </tr>
            )}
          </thead>
          <tbody>
            {this._renderItemRowsHelper()}
          </tbody>
        </table>
      </div>
    )
  }
}
