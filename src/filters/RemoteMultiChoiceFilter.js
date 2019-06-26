import React from 'react'
import RemoteChoiceFilter from './RemoteChoiceFilter'

/**
 * A variation on RemoteChoiceFilter with multiple choices enabled
 * Allows lookup through the API of choices
 */
export default class RemoteMultiChoiceFilter extends React.Component {
  static defaultProps = {
    ...RemoteMultiChoiceFilter.defaultProps,
    multi: true,
    comparisonOptions: [
      {value: 'is', label: 'Is'},
      {value: 'is_not', label: 'Is not'},
    ],
  }
  render() {
    return (
      <RemoteChoiceFilter
        {...this.props}
      />)
  }
}
