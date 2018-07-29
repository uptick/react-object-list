import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import OptionalField from './OptionalField'

class OptionalFieldGroup extends Component {
  static propTypes = {
    fieldKey: PropTypes.string,
    dataKey: PropTypes.string,
    header: PropTypes.string,
    displayName: PropTypes.string,
    on: PropTypes.bool,
    /** array of {key, name} for all optional columns */
    subFields: PropTypes.arrayOf(PropTypes.shape({
      fieldKey: PropTypes.string,
      dataKey: PropTypes.string,
      header: PropTypes.string,
      displayName: PropTypes.string,
      on: PropTypes.bool,
    })),
    /** callback function when toggling an extra column on or off */
    toggleOn: PropTypes.func,
    toggleOff: PropTypes.func,
  }

  static defaultProps = {}

  render() {
    const {columns, optionalFields, extraColumns, updateColumns} = this.props
    const fields = columns.filter(
      ({fieldKey}) => optionalFields.includes(fieldKey)
    ).map(field => {
      const fieldKey = field.fieldKey || ('dataKey' in field ? field.dataKey.substring(field.dataKey.lastIndexOf('.') + 1) : null)
      return <OptionalField
        key={`field-${fieldKey}`}
        enabled={extraColumns.includes(fieldKey)}
        onChange={updateColumns}
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
