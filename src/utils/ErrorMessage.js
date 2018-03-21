import React from 'react'
import PropTypes from 'prop-types'

class ErrorMessage extends React.Component {
  static propTypes = {error: PropTypes.objectOf(Error)}
  render() {
    const {error} = this.props
    if (error && error.message) {
      return (
        <div className="apilist-error">
          <i className="fa fa-exclamation-triangle apilist-error__icon" />
          <span>{error.message}</span>
        </div>
      )
    } else {
      return null
    }
  }
}

export default ErrorMessage
