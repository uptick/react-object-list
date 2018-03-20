import React from 'react'
import PropTypes from 'prop-types'

const Select = props => React.createElement('Select', props, props.children)
Select.Async = 'Select.Async'
/* eslint-disable-next-line */
Select.propTypes = {value: PropTypes.any, children: PropTypes.any}

export default Select
