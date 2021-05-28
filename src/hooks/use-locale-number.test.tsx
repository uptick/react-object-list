import React from 'react'
import { mount } from 'enzyme'
import { ObjectListProvider } from '../providers'
import useLocaleNumber from './use-locale-number'
import type { NumberToLocaleParameters } from '../types'

type Formatter = {
  parameters?: NumberToLocaleParameters
  value: number
}

const CurrencyFormatter: React.FC<Formatter> = ({ parameters, value }: Formatter) => {
  const { format } = useLocaleNumber({ ...parameters, currency: true })
  return <div>{format(value)}</div>
}

const NumberFormatter: React.FC<Formatter> = ({ parameters, value }: Formatter) => {
  const { format } = useLocaleNumber({ ...parameters })
  return <div>{format(value)}</div>
}

describe('Convert Number To Locale', () => {
  it('Correctly Returns The Locale and Number Formatting.', () => {
    const parameters = {
      locale: 'en-AU',
      decimals: 2,
      currencyFormat: 'AUD',
    }

    const wrapper = mount(
      <ObjectListProvider>
        <CurrencyFormatter parameters={parameters} value={123456} />
      </ObjectListProvider>
    )

    const value = wrapper.find('div').text()

    expect(value).toBe('$123,456.00')
  })

  it('Correctly Returns Currency 5 Decimal Points.', () => {
    const parameters = {
      currencyFormat: 'AUD',
      decimals: 5,
      locale: 'en-AU',
    }

    const wrapper = mount(
      <ObjectListProvider>
        <CurrencyFormatter parameters={parameters} value={123456.12345} />
      </ObjectListProvider>
    )

    const value = wrapper.find('div').text()

    expect(value).toEqual('$123,456.12345')
  })

  it('Correctly Returns Formatter Number with Other Currencies', () => {
    const parameters = {
      currencyFormat: 'GBP',
      decimals: 5,
      locale: 'en-GB',
    }

    const wrapper = mount(
      <ObjectListProvider >
        <CurrencyFormatter parameters={parameters} value={123456.12345} />
      </ObjectListProvider>
    )

    const value = wrapper.find('div').text()

    expect(value).toEqual('£123,456.12345')
  })

  it('Correctly Returns 2 Decimal Places If Decimals are Undefined', () => {
    const wrapper = mount(
      <ObjectListProvider>
        <CurrencyFormatter value={123456.1233} />
      </ObjectListProvider>
    )

    const value = wrapper.find('div').text()

    expect(value).toEqual('$123,456.12')
  })

  it('Correctly Returns Formatted Number with Minimal Paramters', () => {
    const wrapper = mount(
      <ObjectListProvider>
        <NumberFormatter value={123456.12345} />
      </ObjectListProvider>
    )

    const value = wrapper.find('div').text()

    expect(value).toEqual('123,456.12')
  })

  it('Correctly Returns Only Formatted Value Periods Instead of Commans', () => {
    const parameters = {
      locale: 'de-DE',
    }

    const wrapper = mount(
      <ObjectListProvider>
        <NumberFormatter parameters={parameters} value={123456.12345} />
      </ObjectListProvider>
    )

    const value = wrapper.find('div').text()

    expect(value).toEqual('123.456,12')
  })
})
