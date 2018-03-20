import React from 'react'
import ClassNames from 'classnames'

const loadingSpinner = function(colour) {
  let style = {}
  if (colour) { style = {color: colour} }

  return (
    <i
      className={ClassNames('icon loading fa fa-circle-o-notch fa-spin', {
        'text-primary': (Object.keys(style).length === 0),
      })}
      style={style}
    />
  )
}
export default loadingSpinner
