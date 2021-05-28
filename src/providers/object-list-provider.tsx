// contexts/auth.js

import React from 'react'
import { ObjectListContext } from '../context'
import type { ReactObjectListContext } from '../types'

const ObjectListProvider: React.FC<ReactObjectListContext> = ({ children, locale, currencyFormat, decimals }) => {
  const payload = {
    locale: locale || 'en-AU',
    currencyFormat: currencyFormat || 'AUD',
    decimals: decimals || 2,
  }

  return (
    <ObjectListContext.Provider value={payload}>
      {children}
    </ObjectListContext.Provider>
  )
}

export default ObjectListProvider
