import initStoryshots, {multiSnapshotWithOptions} from '@storybook/addon-storyshots'

jest.mock('@storybook/addon-info', () => ({
  withInfo: () => jest.fn(story => story),
}))

initStoryshots({
  test: multiSnapshotWithOptions({})
})
