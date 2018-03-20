import React from 'react'
import { snapshotTest } from 'utils/tests'
import HeaderField from '../HeaderField'

describe('header field', () => {
  describe('snapshopt', () => {
    const props = {
      key: 'header_sort_key',
      header: 'Header Text',
      sortable: true,
    }
    it('renders correctly', () => {
      snapshotTest(<HeaderField {...props} />)
    })
  })
})
