import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import OptionalField from './OptionalField'

class OptionalFields extends Component {
  static propTypes = {
    optionalFields: PropTypes.array,
    /** array of keys for currently displayed optional fields */
    extraColumns: PropTypes.arrayOf(PropTypes.string),
    /** callback function when toggling an extra column on or off */
    updateColumns: PropTypes.func,
  }

  static defaultProps = {
    optionalFields: [],
    extraColumns: [],
  }

  componentWillMount() {
    document.body.addEventListener('click', this.handleDropdown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleDropdown)
  }

  state = {
    optionalFieldsOpen: false,
  }

  /**
   * Toggles open status of optional field dropdown
   */
  handleDropdown = (event) => {
    this.setState(prevState => {
      const newState = {
        optionalFieldsOpen: false,
      }
      if (event.target === this.optionalFieldsButton) {
        newState.optionalFieldsOpen = !prevState.optionalFieldsOpen
      } else if (event.target) {
        let el = event.target.parentElement
        while (el) {
          if (el === this.optionalFieldsDropdown) {
            newState.optionalFieldsOpen = true
            break
          }
          el = el.parentElement
        }
      }
      return newState
    })
  }

  renderOptionalFields = (optionalFields, prepend = '') => {
    return optionalFields.map(optionalField => {
      if (optionalField.hasOwnProperty('columns') && optionalField.columns.length) {
        const spacer = prepend.length > 0 ? ' ' : ''
        return this.renderOptionalFields(optionalField.columns, prepend + spacer + optionalField.header)
      } else {
        return this._renderOptionalFieldsArray(optionalField, prepend)
      }
    })
  }

  _renderOptionalFieldsArray = (optionalFields, prepend) => {
    const fields = Array.isArray(optionalFields) ? optionalFields : [optionalFields]
    return fields.map(field => {
      return <OptionalField
        key={`field-${field.dataKey}`}
        enabled={this.props.extraColumns.includes(field.fieldKey)}
        onChange={this.props.updateColumns}
        fieldKey={field.fieldKey}
        name={`${prepend} ${(field.displayName || field.header)}`}
        className="objectlist-dropdown__item"
      />
    })
  }

  render() {
    const fields = this.renderOptionalFields(this.props.optionalFields)

    if (fields.length) {
      return (
        <div className={ClassNames('objectlist-dropdown', {
          open: this.state.optionalFieldsOpen,
        })} ref={el => { this.optionalFieldsDropdown = el }}>
          <button
            ref={el => { this.optionalFieldsButton = el }}
            className={ClassNames('objectlist-button objectlist-button--dropdown objectlist-button--borderless', {
              open: this.state.optionalFieldsOpen,
            })}
          >
            <i className="fa fa-list" /> Change columns
          </button>
          <div className="objectlist-dropdown__menu objectlist-dropdown__menu--borderless">
            {fields}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default OptionalFields
