import React from 'react'
import Moment from 'moment'
import { snapshotTest } from 'utils/tests'
import { SHORTDATE_FORMAT } from '../../utils'
import { DateTime } from '../'

describe('Predefined cells', () => {
  it('DateTime', () => {
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
})
