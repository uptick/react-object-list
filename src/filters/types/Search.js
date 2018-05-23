import React from 'react'
import PropTypes from 'prop-types'

/**
 * Filter input used to pass text values,
 * customised for a single search field
 */
class Search extends React.Component {
  static propTypes = {
    /** Current value of filter */
    value: PropTypes.string,
    /** Function to call on change */
    onChange: PropTypes.func,
    /** ms to wait after typing stops to send request */
    updateDelay: PropTypes.number,
  }

  static defaultProps = {
    updateDelay: 400,
    value: '',
  }

  state = {
    currentValue: this.props.value,
    updateScheduled: null,
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      this.setState(() => ({currentValue: nextProps.value}))
    }
  }

  /**
   * Debounce call to get result until user has stopped typing
   */
  scheduleUpdate() {
    if (this.state.updateScheduled) {
      clearTimeout(this.state.updateScheduled)
    }
    this.setState(() => ({
      updateScheduled: setTimeout(
        // eslint-disable-next-line
        () => this.props.onChange(this.state.currentValue), this.props.updateDelay
      ),
    }))
  }

  /**
   * Handles value change and calls scheduleUpdate
   */
  handleValueChange = (event) => {
    const newValue = event.target.value
    this.setState(() => ({
      currentValue: newValue,
    }), this.scheduleUpdate())
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.currentValue}
        onChange={this.handleValueChange}
        className="objectlist-current-filter__active-status objectlist-input"
        placeholder="Search the table below"
      />
    )
  }
}

export default Search
