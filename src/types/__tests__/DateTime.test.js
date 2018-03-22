import React from 'react'
import Moment from 'moment'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import { SHORTDATE_FORMAT, API_DATE_FORMAT } from '../../utils'
import { DateTime } from '../'

describe('DateTime', () => {
  it('parses date correctly', () => {
    const date = Moment('2017-01-01')
    const laterDate = Moment('2017-02-01')
    const testValues = [
      {},
      {empty: 'No content'},
      {value: date},
      {value: date, outputFormat: SHORTDATE_FORMAT},
      {value: '2018-02-07', outputFormat: SHORTDATE_FORMAT, dateOnly: true},
      {value: '2018-02-07 14:00:11', outputFormat: SHORTDATE_FORMAT, dateOnly: true},
      {value: [date, laterDate]},
      {value: {start: date, end: laterDate}},
      {value: {start: date, end: laterDate}, seperator: 'to'},
    ]
    testValues.forEach(testValue => {
      snapshotTest(<DateTime {...testValue} />)
    })
  })
  it('handles errors in utc', () => {
    const dateString = '2018-02-07'
    const instance = shallow(<DateTime dateOnly outputFormat="DD/MM/YY" />).instance()
    spyOn(Moment, 'utc').and.callFake(() => { throw new Error('BAD') })
    const result = instance.formatDateTime(dateString)
    expect(Moment.utc).toHaveBeenCalledWith(dateString, API_DATE_FORMAT)
    expect(result).toBe('07/02/18')
  })
})
