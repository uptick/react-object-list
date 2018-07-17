import React from 'react'
import ChoiceFilter from './ChoiceFilter'

/**
 * Variation of ChoiceFilter with multiple options select enabled
 */
class MultiChoiceFilter extends React.Component {
  static defaultProps = {
    ...ChoiceFilter.defaultProps,
    multi: true,
    options: [],
  }
  render() {
    return (<ChoiceFilter {...this.props} />)
  }
}
export default MultiChoiceFilter
