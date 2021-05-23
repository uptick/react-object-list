import React from 'react'
import { snapshotTest } from '../../../utils/tests'
import Overlay from '../Overlay'

describe('Overlay', () => {
  describe('Snapshots', () => {
    it('not loading', () => {
      snapshotTest(<Overlay status="done" />)
    })
    it('loading', () => {
      snapshotTest(<Overlay status="loading" />)
    })
  })
})
