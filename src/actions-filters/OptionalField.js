import React from 'react'
import PropTypes from 'prop-types'

/**
 * Represents a single item in the "Visible Fields" drop-down
 */
export default class OptionalField extends React.Component {
  static propTypes = {
    /** callback function to enable the optional field and save it to user preferences */
    onChange: PropTypes.func.isRequired,
    /** the api key used for this particular field */
    fieldKey: PropTypes.string,
    /** whether or not the field is enabled (displayed) */
    enabled: PropTypes.bool,
    /** the display text for the field */
    name: PropTypes.string,
    /** Icon to display when a field is enabled */
    CheckboxCheckedIcon: PropTypes.element,
    /** Icon to display when a field is not enabled */
    CheckboxUnCheckedIcon: PropTypes.element,
  }

  static defaultProps = {
    enabled: false,
    CheckboxCheckedIcon: <React.Fragment>&#x2611;</React.Fragment>,
    CheckboxUnCheckedIcon: <React.Fragment>&#x2610;</React.Fragment>,
  }

  /**
   * Toggles an optional field to be displayed by the objectlist
   *
   * @event {MouseEvent} event - event that fires when clicking on an OptionalField component
   */
  toggle = (event) => {
    event.preventDefault()
    this.props.onChange(this.props.fieldKey)
  }

  render() {
    const {enabled, CheckboxCheckedIcon, CheckboxUnCheckedIcon, name} = this.props
    const checked = enabled ? CheckboxCheckedIcon : CheckboxUnCheckedIcon
    return (
      <button className="objectlist-dropdown__item" onClick={this.toggle}>
        {checked}{name}
      </button>
    )
  }
}
