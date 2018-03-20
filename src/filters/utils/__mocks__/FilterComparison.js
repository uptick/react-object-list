import React from 'react'

const MockFilterComparison = props => React.createElement('FilterComparison', props)
const RealFilterComparison = require.requireActual('../FilterComparison').default
/* eslint-disable-next-line */
MockFilterComparison.propTypes = RealFilterComparison.propTypes

export default MockFilterComparison
