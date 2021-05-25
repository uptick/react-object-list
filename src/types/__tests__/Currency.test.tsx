import React from 'react'
import { mount } from 'enzyme'
import { ObjectListProvider } from '../../providers'
import Currency from '../currency-type'

describe('Currency Type', () => {
  it('Correctly Returns The Locale and Number Formatting.', () => {
    const wrapper = mount(
      <ObjectListProvider locale="en-AU" currencyFormat="AUD">
        <Currency value={123456} />
      </ObjectListProvider>
    )

    const value = wrapper.find('span').text()

    expect(value).toBe('$123,456.00')
  })

  it('Correctly Returns Currency 5 Decimal Points.', () => {
    const wrapper = mount(
      <ObjectListProvider locale="en-AU" decimals={5} currencyFormat="AUD">
        <Currency value={123456.12345} />
      </ObjectListProvider>
    )

    const value = wrapper.find('span').text()

    expect(value).toEqual('$123,456.12345')
  })

  it('Correctly Returns Formatter Number with Other Currencies', () => {
    const wrapper = mount(
      <ObjectListProvider locale="en-GB" decimals={5} currencyFormat="GBP" >
        <Currency value={123456.12345} />
      </ObjectListProvider>
    )

    const value = wrapper.find('span').text()

    expect(value).toEqual('£123,456.12345')
  })

  it('Correctly Returns 2 Decimal Places If Decimals are Undefined', () => {
    const wrapper = mount(
      <ObjectListProvider locale="en-GB" currencyFormat="GBP">
        <Currency value={123456.1233} />
      </ObjectListProvider>
    )

    const value = wrapper.find('span').text()

    expect(value).toEqual('£123,456.12')
  })
})
