import useLocaleNumber from './use-locale-number'

describe('Convert Number To Locale', () => {
  it('Correctly Returns The Locale and Number Formatting.', () => {
    const parameters = {
      currency: 'AUD',
      decimals: 2,
      locale: 'en-AU',
      value: 123456,
    }

    const { format } = useLocaleNumber(parameters)

    expect(format(123456)).toEqual('$123,456.00')
  })

  it('Correctly Returns Currency 5 Decimal Points.', () => {
    const parameters = {
      currency: 'AUD',
      decimals: 5,
      locale: 'en-AU',
    }

    const { format } = useLocaleNumber(parameters)

    expect(format(123456.12345)).toEqual('$123,456.12345')
  })

  it('Correctly Returns 2 Decimal Places If Decimals are Undefined', () => {
    const parameters = {
      currency: undefined,
      decimals: undefined,
      locale: undefined,
      value: 123456.12345,
    }

    const { format } = useLocaleNumber(parameters)

    expect(format(123456.12)).toEqual('123,456.12')
  })

  it('Correctly Returns Formatted Number with Minimal Paramters', () => {
    const parameters = {
      currency: undefined,
      decimals: undefined,
      locale: undefined,
      value: 123456.12345,
    }

    const { format } = useLocaleNumber(parameters)

    expect(format(123456.12345)).toEqual('123,456.12')
  })

  it('Correctly Returns Formatter Number with Other Currencies', () => {
    const parameters = {
      currency: 'GBP',
      decimals: 5,
      locale: 'en-GB',
      value: 123456.12345,
    }

    const { format } = useLocaleNumber(parameters)

    expect(format(123456.12345)).toEqual('£123,456.12345')
  })

  it('Correctly Returns Only Formatted Value If No Locale is Provided.', () => {
    const parameters = {
      currency: 'GBP',
      decimals: undefined,
      locale: undefined,
    }

    const { format } = useLocaleNumber(parameters)

    expect(format(123456.12345)).toEqual('123,456.12')
  })

  it('Correctly Returns Only Formatted Value If No Currency is Provided.', () => {
    const parameters = {
      currency: undefined,
      decimals: undefined,
      locale: 'en-GB',
      value: 123456.12345,
    }

    const { format } = useLocaleNumber(parameters)

    expect(format(123456.12345)).toEqual('123,456.12')
  })
})
