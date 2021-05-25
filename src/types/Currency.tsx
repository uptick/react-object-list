import React from 'react'
import Empty from './Empty'
import { useLocaleNumber } from '../hooks'

export type CurrencyType = {
  value?: number
}

const Currency: React.FC<CurrencyType> = ({ value }: CurrencyType) => {
  const { format } = useLocaleNumber({ currency: true })

  if (typeof value === 'undefined' || value === null) {
    return (<Empty value={value} />)
  }

  return (<span>{format(value)}</span>)
}

export default Currency
