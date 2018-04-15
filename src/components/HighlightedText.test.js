import React from 'react'
import { shallow } from 'enzyme'

import HighlightedText from './HighlightedText'

it('renders without crashing', function () {
  const props = {
    matches: []
  }
  const wrapper = shallow(<HighlightedText {...props}>Text</HighlightedText>)
})

it('renders text without matches', function () {
  const props = {
    matches: []
  }
  const wrapper = shallow(<HighlightedText {...props}>Text</HighlightedText>)
  expect(wrapper.html()).toEqual(
    '<span>Text</span>'
  )
})

it('renders text with 1 match in the middle', function () {
  const props = {
    matches: [[1,1]]
  }
  const wrapper = shallow(<HighlightedText {...props}>Text</HighlightedText>)
  expect(wrapper.html()).toEqual([
    '<span>',
      '<span>T</span>',
      '<span class="has-background-warning">e</span>',
      '<span>xt</span>',
    '</span>',
  ].join(''))
})

it('renders text with 2 matches in the middle', function () {
  const props = {
    matches: [[1,1], [2,2]]
  }
  const wrapper = shallow(<HighlightedText {...props}>Text</HighlightedText>)
  expect(wrapper.html()).toEqual([
    '<span>',
      '<span>T</span>',
      '<span class="has-background-warning">e</span>',
      '<span class="has-background-warning">x</span>',
      '<span>t</span>',
    '</span>',
  ].join(''))
})

it('renders text with 1 match at the start', function () {
  const props = {
    matches: [[0,1]]
  }
  const wrapper = shallow(<HighlightedText {...props}>Text</HighlightedText>)
  expect(wrapper.html()).toEqual([
    '<span>',
      '<span class="has-background-warning">Te</span>',
      '<span>xt</span>',
    '</span>',
  ].join(''))
})

it('renders text with 1 match at the end', function () {
  const props = {
    matches: [[2,3]]
  }
  const wrapper = shallow(<HighlightedText {...props}>Text</HighlightedText>)
  expect(wrapper.html()).toEqual([
    '<span>',
      '<span>Te</span>',
      '<span class="has-background-warning">xt</span>',
    '</span>',
  ].join(''))
})
