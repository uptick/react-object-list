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

storiesOf('object-list/Filters/NumberSliderFilter', module)
  .addDecorator((story, context) => withInfo(
    'Number Slider filter user to select any number in a range'
  )(story)(context))
  .add('Standard', () => (
    <NumberSliderFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      value={45}
    />
  ))
  .add('Decimal with fixed range', () => (
    <NumberSliderFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      value={21.5}
      precision={1}
      min={20}
      max={25}
    />
  ))
  .add('Logarithmic', () => (
    <NumberSliderFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      value={45}
      logarithmic
    />
  ))
  .add('Decimal logarithmic with fixed range', () => (
    <NumberSliderFilter
      {...baseProps}
      name="Filter by"
      filterKey="filterkey"
      logarithmic
      value={21.5}
      precision={1}
      min={20}
      max={25}
    />
  ))
