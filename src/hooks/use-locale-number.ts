import { useContext } from 'react'
import { ObjectListContext } from '../context'
import type { NumberToLocale, NumberToLocaleParameters } from '../types'

export default function useLocaleNumber(params?: NumberToLocaleParameters): NumberToLocale {
  const context = useContext(ObjectListContext)

  const configuration = {
    currency: false,

    // add override from context if provided.
    ...context,

    // add override if params are provided.
    ...params,
  }

  const { currency, locale, decimals, currencyFormat } = configuration

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }

  if (currency) {
    options.style = 'currency'
    options.currency = currencyFormat
  }

  function format(value = 0) {
    return new Intl.NumberFormat(locale, options).format(value)
  }

  return {
    format,
    configuration,
  }
}
