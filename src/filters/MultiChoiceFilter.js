import React from 'react'
import ChoiceFilter from './ChoiceFilter'

/**
 * Variation of ChoiceFilter with multiple options select enabled
 */
class MultiChoiceFilter extends React.Component {
  render() {
    return (<ChoiceFilter multi {...this.props} />)
  }
}
export default MultiChoiceFilter
