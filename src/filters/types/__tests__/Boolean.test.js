import React from 'react'
import { snapshotTest } from 'utils/tests'
import Boolean from '../Boolean'

jest.mock('../Choice', () => 'Choice')

describe('Boolean', () => {
  describe('Snapshots', () => {
    const baseProps = {
      onChange: jest.fn(),
      value: 'True',
    }
    it('renders true', () => {
      snapshotTest(<Boolean {...baseProps} />)
    })
    it('renders false', () => {
      snapshotTest(<Boolean {...baseProps} value="False" />)
    })
    it('has custom labels', () => {
      snapshotTest(<Boolean {...baseProps} trueLabel="Very True" falseLabel="Super False" />)
    })
  })
})
