import React from 'react'
import Empty from './Empty'
import { useLocaleNumber } from '../hooks'
import type { CurrencyType } from '../types'

const NumberType: React.FC<CurrencyType> = ({ value }: CurrencyType) => {
  const { format } = useLocaleNumber()

  if (typeof value === 'undefined' || value === null) {
    return (<Empty value={value} />)
  }

  return (<span>{format(value)}</span>)
}

export default NumberType
