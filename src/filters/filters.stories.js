import React from 'react'
import Moment from 'moment'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'

import {
  BooleanFilter,
  DateFilter,
  DayFilter,
  CurrencyFilter,
  MonthFilter,
  NumberSliderFilter,
  RemoteChoiceFilter,
  RemoteMultiChoiceFilter,
  SearchFilter,
  ChoiceFilter,
  MultiChoiceFilter,
  TextContainsFilter,
} from '.'

const baseProps = {
  onChange: action('Filter changed'),
  removeFilter: action('Remove filter'),
}

storiesOf('object-list/Filters', module)
  .addDecorator((story, context) => withInfo(
    'Components used to configure filtering on the api list'
  )(story)(context))
  .add('BooleanFilter', () => (
    <BooleanFilter
      {...baseProps}
      name="Active"
      filterKey="active"
    />
  ))
  .add('DateFilter', () => (
    <DateFilter
      {...baseProps}
      name="Created"
      filterKey="created"
      comparison="fixed"
    />
  ))
  .add('DayFilter', () => (
    <DayFilter
      {...baseProps}
      filterKey="created"
      value={Moment(1519809160079)}
      permanent
    />
  ))
  .add('CurrencyFilter', () => (
    <CurrencyFilter
      {...baseProps}
      name="Cost"
      filterKey="cost"
    />
  ))
  .add('MonthFilter', () => (
    <MonthFilter
      {...baseProps}
      name="Due In"
      filterKey="due"
      value={Moment(1519809160079)}
    />
  ))
  .add('NumberSliderFilter', () => (
    <NumberSliderFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      value={45}
    />
  ))
  .add('RemoteChoiceFilter', () => (
    <RemoteChoiceFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      loadOptions={action('Load options')}
    />
  ))
  .add('RemoteMultiChoiceFilter', () => (
    <RemoteMultiChoiceFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      loadOptions={action('Load options')}
    />
  ))
  .add('SearchFilter', () => (
    <SearchFilter
      {...baseProps}
      filterKey="filterkey"
      permanent
    />
  ))
  .add('ChoiceFilter', () => (
    <ChoiceFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      options={[
        {value: 0, label: 'Zero'},
        {value: 1, label: 'One'},
        {value: 2, label: 'Two'},
        {value: 3, label: 'Three'},
      ]}
    />
  ))
  .add('MultiChoiceFilter', () => (
    <MultiChoiceFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      options={[
        {value: 0, label: 'Zero'},
        {value: 1, label: 'One'},
        {value: 2, label: 'Two'},
        {value: 3, label: 'Three'},
      ]}
    />
  ))
  .add('TextContainsFilter', () => (
    <TextContainsFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
    />
  ))
