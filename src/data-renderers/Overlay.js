import React, { PureComponent } from 'react'
import ClassNames from 'classnames'
import { STATUS_TYPE, STATUS_CHOICES } from '../utils/proptypes'

export default class Overlay extends PureComponent {
  static propTypes = {
    /** loading status used if data is loaded asynchronously  */
    status: STATUS_TYPE,
  }

  static defaultProps = {
    status: 'done',
  }

  render() {
    return (
      <div className={ClassNames('objectlist__overlay', {
        'objectlist__overlay--loading': this.props.status === STATUS_CHOICES.loading,
      })} />
    )
  }
}
