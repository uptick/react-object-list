import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * The component that is to be displayed within ListRenderer
 * if a custom Renderer is not provided
 */
export default class ListCard extends Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.object,
  }

  static defaultProps = {
    columns: [],
    data: {},
  }

  renderItemRows = () => {
    const {columns, data} = this.props
    return columns.map((column, idx) => (
      <div className="objectlist-list__content" key={`list-item-${idx}`}>
        <h2 className="objectlist-list__header">{column.header}:</h2>
        <div className="objectlist-list__body">{data[column.dataKey]}</div>
      </div>
    ))
  }

  render() {
    return (
      <li className="objectlist-list__item">
        <a href={this.props.data.url || '#'} className="objectlist-list__link">View</a>
        {this.renderItemRows()}
      </li>
    )
  }
}
