import 'babel-polyfill'
import { configure } from '@storybook/react';
import '../src/main.sass'
import '../node_modules/font-awesome/css/font-awesome.min.css'

const appStories = require.context('../src/', true, /stories\.js$/)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)

function loadStories() {
  requireAll(appStories)
}


configure(loadStories, module)
