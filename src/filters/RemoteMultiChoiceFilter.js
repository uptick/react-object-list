import React from 'react'
import RemoteChoiceFilter from './RemoteChoiceFilter'

/**
 * A variation on RemoteChoiceFilter with multiple choices enabled
 * Allows lookup through the API of choices
 */
export default class RemoteMultiChoiceFilter extends React.Component {
  render() {
    return (
      <RemoteChoiceFilter
        multi
        comparisonOptions={[
          {value: 'is', label: 'Is'},
          {value: 'is_not', label: 'Is Not'},
        ]}
        {...this.props}
      />)
  }
}
