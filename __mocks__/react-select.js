import React from 'react'
import PropTypes from 'prop-types'

jest.mock('react-select/lib/Async', () => 'Select.Async')

const Select = props => React.createElement('Select', props, props.children)
Select.Async = 'Select.Async'
/* eslint-disable-next-line */
Select.propTypes = {value: PropTypes.any, children: PropTypes.any}

export default Select
