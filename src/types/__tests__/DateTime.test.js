import React from 'react'
import Moment from 'moment'
import { shallow } from 'enzyme'
import { snapshotTest } from 'utils/tests'
import { SHORTDATE_FORMAT, API_DATE_FORMAT } from '../../utils'
import { DateTime } from '../'

describe('DateTime', () => {
  describe('Snapshots', () => {
    it('parses dates', () => {
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
  describe('Functions', () => {
    describe('Format date time', () => {
      it('handles errors in utc', () => {
        const dateString = '2018-02-07'
        const instance = shallow(<DateTime dateOnly outputFormat="DD/MM/YY" />).instance()
        spyOn(Moment, 'utc').and.callFake(() => { throw new Error('BAD') })
        const result = instance.formatDateTime(dateString)
        expect(Moment.utc).toHaveBeenCalledWith(dateString, API_DATE_FORMAT)
        expect(result).toBe('07/02/18')
      })
      it('returns empty if date invalid', () => {
        spyOn(console, 'warn')
        const dateString = 'abcdef'
        const instance = shallow(<DateTime outputFormat="DD/MM/YY" empty="No date" />).instance()
        const result = instance.formatDateTime(dateString)
        expect(result).toBe('No date')
        expect(console.warn.calls.count()).toEqual(1)
      })
    })
    describe('Format range', () => {
      let instance
      beforeEach(() => {
        instance = shallow(<DateTime seperator="to" />).instance()
        spyOn(instance, 'formatDateTime').and.callFake(input => Moment(input).format('DD/MM'))
      })
      it('builds date string', () => {
        const dates = [
          '2009-01-23',
          '2018-03-21',
          '2019-10-04',
        ]
        const result = instance.formatRange(dates)
        expect(result).toBe('23/01 to 21/03 to 04/10')
      })
      it('ignores duplicates', () => {
        const dates = [
          '2009-01-23',
          '2009-01-23',
          '2018-03-21',
          '2019-10-04',
        ]
        const result = instance.formatRange(dates)
        expect(result).toBe('23/01 to 21/03 to 04/10')
      })
    })
  })
})