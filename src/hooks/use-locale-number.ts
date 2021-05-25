import type { NumberToLocale, NumberToLocaleParameters } from '../types'

export default function useLocaleNumber(params: NumberToLocaleParameters): NumberToLocale {
  const { currency, locale, decimals } = params

  const places: number = typeof decimals !== 'undefined' ? decimals : 2
  const country: string = typeof locale === 'undefined' ? 'en-AU' : locale

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  }

  if (typeof currency !== 'undefined' && typeof locale !== 'undefined') {
    options.style = 'currency'
    options.currency = currency
  }

  function format(value: number) {
    return new Intl.NumberFormat(country, options).format(value)
  }

  return {
    format,
  }
}
