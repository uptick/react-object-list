import React from 'react'
import { shallow } from 'enzyme'
import { snapshotTest } from '../../../utils/tests'
import Page from '../Page.js'

const mockEvent = {
  preventDefault: jest.fn(),
}

describe('Page', () => {
  const defaultProps = {
    goToPage: jest.fn(),
    page: 4,
  }
  describe('Snapshots', () => {
    it('has page number', () => {
      snapshotTest(<Page {...defaultProps} />)
    })
    it('has label', () => {
      snapshotTest(<Page {...defaultProps} label="New page please" />)
    })
    it('is active', () => {
      snapshotTest(<Page {...defaultProps} active />)
    })
    it('is disabled', () => {
      snapshotTest(<Page {...defaultProps} disabled />)
    })
    it('is active and disabled', () => {
      snapshotTest(<Page {...defaultProps} disabled active />)
    })
  })
  describe('Functions', () => {
    it('handles page click', () => {
      spyOn(mockEvent, 'preventDefault')
      spyOn(defaultProps, 'goToPage')
      const instance = shallow(<Page {...defaultProps} page={99} />).instance()
      instance.handlePageClick(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(defaultProps.goToPage).toHaveBeenCalledWith(99)
    })
  })
})
