import 'babel-polyfill'
import { configure } from '@storybook/react';
import '../src/main.sass'
import React from 'react'
import whyDidYouUpdate from 'why-did-you-update'

const appStories = require.context('../src/', true, /stories\.js$/)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)

function loadStories() {
  requireAll(appStories)
}


whyDidYouUpdate(React)
configure(loadStories, module)
