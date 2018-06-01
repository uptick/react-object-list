import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import OptionalField from './OptionalField'
import {valueEqual} from '../utils/functions'

class OptionalFields extends Component {
  static propTypes = {
    /** array of {key, name} for all optional columns */
    optionalFields: PropTypes.arrayOf(PropTypes.shape({
      fieldKey: PropTypes.string,
      dataKey: PropTypes.string,
      header: PropTypes.string,
      displayName: PropTypes.string,
    })),
    /** array of keys for currently displayed optional fields */
    extraColumns: PropTypes.arrayOf(PropTypes.string),
    /** callback function when toggling an extra column on or off */
    updateColumns: PropTypes.func,
  }

  static defaultProps = {
    optionalFields: [],
    extraColumns: [],
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !valueEqual(this.props.optionalFields, nextProps.optionalFields) ||
      !valueEqual(this.props.extraColumns, nextProps.extraColumns)
    )
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

  render() {
    const fields = this.props.optionalFields.map(field => {
      const fieldKey = field.fieldKey || field.dataKey.substring(field.dataKey.lastIndexOf('.') + 1)
      return <OptionalField
        key={`field-${field.dataKey}`}
        enabled={this.props.extraColumns.includes(fieldKey)}
        onChange={this.props.updateColumns}
        fieldKey={fieldKey}
        name={field.displayName || field.header}
        className="objectlist-dropdown__item"
      />
    })

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
