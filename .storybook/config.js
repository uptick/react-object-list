import { configure } from '@storybook/react';
import '../src/main.sass'

const appStories = require.context('../src/', true, /stories\.js$/)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)

function loadStories() {
  requireAll(appStories)
}


configure(loadStories, module)
