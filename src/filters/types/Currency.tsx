import React, { useState, SyntheticEvent } from 'react'
import { useLocaleNumber } from '../../hooks'
import type { CurrencyFilterType } from '../../types'

/**
 * Filter input used to pass currency values
 */

const Currency: React.FC<CurrencyFilterType> = ({ value, currencySymbol, onChange }) => {
  const { format } = useLocaleNumber({ currency: true, currencyFormat: currencySymbol })

  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState(value)

  function handleOnInputChange(event: SyntheticEvent<HTMLInputElement>) {
    const target = event?.currentTarget?.value

    setInput(target)

    if (onChange) {
      onChange(target)
    }
  }

  return (
    <div className="objectlist-currency-filter objectlist-current-filter__active-status">
      {editing
        ? <input
            className="objectlist-input objectlist-input--currency"
            onChange={handleOnInputChange}
            onBlur={() => setEditing(false)}
            type="number"
            value={input}
          />
        : <input
            className="objectlist-input objectlist-input--currency objectlist-input-currency-readonly"
            onChange={handleOnInputChange}
            onFocus={() => setEditing(true)}
            value={format(input)}
            type="text"
            readOnly
          />
      }
    </div>
  )
}

Currency.defaultProps = {
  currencySymbol: 'AUD',
}

export default Currency
