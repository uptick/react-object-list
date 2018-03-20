import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

/**
 * Display a green checkmark or red cross depending on whether
 * true or false is passed to the component
 */
class BooleanType extends React.Component {
  static propTypes = {
    /** boolean condition to visually present on the screen */
    condition: PropTypes.bool,
  }

  static defaultProps = {
    condition: false,
  }

  render() {
    return (
      <span className={ClassNames('fa', {'fa-check-circle text-success': this.props.condition, 'fa-times-circle text-danger': !this.props.condition})} />
    )
  }
}

export default BooleanType
