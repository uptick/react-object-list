import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import OptionalField from './OptionalField'

class OptionalFields extends Component {
  static propTypes = {
    /** array of {key, name} for all optional columns */
    optionalFields: PropTypes.arrayOf(PropTypes.shape({
      dataKey: PropTypes.string,
      header: PropTypes.string,
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
      switch (event.target) {
        case this.refs.optionalFieldsButton:
          newState.optionalFieldsOpen = !prevState.optionalFieldsOpen
          break
        default:
          if (
            this.refs.optionalFieldsDropdown &&
            this.refs.optionalFieldsDropdown.contains(event.target)
          ) {
            newState.optionalFieldsOpen = true
          }
          break
      }
      return newState
    })
  }

  render() {
    const fields = this.props.optionalFields.map(field => (
      <OptionalField
        key={`field-${field.dataKey}`}
        enabled={this.props.extraColumns.includes(field.dataKey)}
        onChange={this.props.updateColumns}
        fieldKey={field.dataKey}
        name={field.header}
        className="objectlist-dropdown__item"
      />
    ))

    if (fields.length) {
      return (
        <div className={ClassNames('objectlist-dropdown', {
          open: this.state.optionalFieldsOpen,
        })} ref="optionalFieldsDropdown">
          <button
            ref="optionalFieldsButton"
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
