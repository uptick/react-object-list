import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

/**
 * An element inside TableHeader used to drag and resize
 * a column's width
 */
export default class WidthHandle extends React.Component {
  static propTypes = {
    /** callback function when currently __dragging__ the handle */
    onChange: PropTypes.func,
    /** callback function when finished __dragging__ the handle to save selected width */
    onSave: PropTypes.func,
  }

  state = {
    enabled: false,
    x: null,
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleGlobalMouseMove)
    document.addEventListener('mouseup', this.handleGlobalMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleGlobalMouseMove)
    document.removeEventListener('mouseup', this.handleGlobalMouseUp)
  }

  /**
   * Tracks the distance dragged left or right if currently dragging
   * the handle otherwise do nothing
   *
   * @param {MouseEvent} event - used to calculate the dx mouse movement
   */
  handleGlobalMouseMove = (event) => {
    if (!this.state.enabled) {
      return
    }
    if (this.state.x) { this.props.onChange(event.clientX - this.state.x) }
    this.setState({
      x: event.clientX,
    })
  }

  /**
   * Stop tracking changes and trigger the callback
   * function to save the width of the column
   * does nothing when the handle is not enabled
   *
   * @param {MouseEvent} event
   */
  handleGlobalMouseUp = (event) => {
    if (!this.state.enabled) {
      return
    }
    this.setDisabled()
    this.props.onSave()
  }

  /**
   * Set the handle to enabled ie. the column is being resized
   */
  setEnabled = () => {
    this.setState({
      enabled: true,
    })
  }

  /**
   * Set the handle to disabled. ie. the column is no longer being resized
   */
  setDisabled() {
    this.setState({
      enabled: false,
      x: null,
    })
  }

  /**
   * Change hover state to add hover styles for visual feedback
   */
  handleMouseOver = () => {
    this.setState(state => {
      state.hover = true
      return state
    })
  }

  /**
   * Revert to default styles when not hovering
   */
  handleMouseOut = () => {
    this.setState(state => {
      state.hover = false
      return state
    })
  }

  setWidth(width) {
    this.props.onChange(width)
  }

  render() {
    return (
      <span
        className={ClassNames('handle', {'hover': this.state.hover})}
        onMouseDown={this.setEnabled}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      />
    )
  }
}
