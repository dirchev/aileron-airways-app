import React from 'react'
import { shallow } from 'enzyme'

import Pagination from './Pagination'

it('renders without crashing', function () {
  const props = {
    page: 1,
    pages: 2,
    onPageChange: jest.fn()
  }
  const wrapper = shallow(<Pagination {...props} />)
})

it('renders link for each page', function () {
  const props = {
    page: 1,
    pages: 5,
    onPageChange: jest.fn()
  }
  const wrapper = shallow(<Pagination {...props} />)
  expect(wrapper.find('.pagination-link').length).toEqual(5)
  wrapper.find('.pagination-link').at(3).simulate('click', {preventDefault: jest.fn()})
  expect(props.onPageChange).toBeCalledWith(4)
})

it('renders prev page link when page !== first', function () {
  const props = {
    page: 2,
    pages: 5,
    onPageChange: jest.fn()
  }
  const wrapper = shallow(<Pagination {...props} />)
  expect(wrapper.find('.pagination-previous').length).toEqual(1)
  wrapper.find('.pagination-previous').simulate('click', {preventDefault: jest.fn()})
  expect(props.onPageChange).toBeCalledWith(1)
})

it('renders next page link when page !== last', function () {
  const props = {
    page: 2,
    pages: 5,
    onPageChange: jest.fn()
  }
  const wrapper = shallow(<Pagination {...props} />)
  expect(wrapper.find('.pagination-next').length).toEqual(1)
  wrapper.find('.pagination-next').simulate('click', {preventDefault: jest.fn()})
  expect(props.onPageChange).toBeCalledWith(3)
})

it('does not render prev page link on 1st page', function () {
  const props = {
    page: 1,
    pages: 5,
    onPageChange: jest.fn()
  }
  const wrapper = shallow(<Pagination {...props} />)
  expect(wrapper.find('.pagination-previous').length).toEqual(0)
})

it('does not render next page link on last page', function () {
  const props = {
    page: 5,
    pages: 5,
    onPageChange: jest.fn()
  }
  const wrapper = shallow(<Pagination {...props} />)
  expect(wrapper.find('.pagination-next').length).toEqual(0)
})

it('does not render anything on 1 page', function () {
  const props = {
    page: 1,
    pages: 1,
    onPageChange: jest.fn()
  }
  const wrapper = shallow(<Pagination {...props} />)
  expect(wrapper.html()).toEqual(null)
})
