import initStoryshots, {multiSnapshotWithOptions} from '@storybook/addon-storyshots'

jest.mock('@storybook/addon-info', () => ({
  withInfo: () => jest.fn(story => story),
}))

jest.mock('react-select', () => require('__mocks__/react-select'))

initStoryshots({
  test: multiSnapshotWithOptions({
    createNodeMock: elem => {
      if (elem.type === 'input' && elem.props.type === 'checkbox') {
        const ref = document.createElement('input')
        ref.setAttribute('type', 'checkbox')
        elem.checkbox = ref
        return elem
      }
    }
  })
})
