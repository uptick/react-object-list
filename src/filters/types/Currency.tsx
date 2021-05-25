import React, { SyntheticEvent } from 'react'

/**
 * Filter input used to pass currency values
 */

export type CurrencyFilterType = {
  /** Current value of filter */
  value?: string,
  /** Currency symbol to be displayed */
  currencySymbol?: string
  /** Function called when value changed */
  onChange?: (value: string) => void
}

const Currency: React.FC<CurrencyFilterType> = ({ value, currencySymbol, onChange }) => {
  function handleInputChange(event: SyntheticEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event.currentTarget.value)
    }
  }

  return (
    <div className="objectlist-currency-filter objectlist-current-filter__active-status">
      <span className="objectlist-currency-filter__symbol">{currencySymbol}</span>
      <input
        className="objectlist-input objectlist-input--currency"
        onChange={handleInputChange}
        value={value}
        type="text"
      />
      <span className="objectlist-currency-filter__decimal">.00</span>
    </div>
  )
}

Currency.defaultProps = {
  currencySymbol: '$',
}

export default Currency
