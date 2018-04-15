import React from 'react'
import AttachmentItem from './AttachmentItem.js'
import { shallow } from 'enzyme'

it('renders without an error', () => {
  const props = {
    attachment: {
      Id: 'Attachment 1',
      Title: 'Attachment 1'
    },
    deleteAttachment: () => {}
  }
  const wrapper = shallow(<AttachmentItem {...props}/>)
})

it('shows attachment title, download and delete', () => {
  const props = {
    attachment: {
      Id: 'Attachment 1',
      Title: 'Attachment 1',
      getURL: 'http://example.com'
    },
    deleteAttachment: () => {}
  }
  const wrapper = shallow(<AttachmentItem {...props}/>)
  expect(wrapper.text()).toContain('Attachment 1')
  expect(wrapper.text()).toContain('Download')
  expect(wrapper.text()).toContain('Delete')
})

it('shows loading state', () => {
  const props = {
    attachment: {
      Id: 'Attachment 1',
      Title: 'Attachment 1',
      loading: true
    },
    deleteAttachment: () => {}
  }
  const wrapper = shallow(<AttachmentItem {...props}/>)
  expect(wrapper.text()).toContain('Attachment 1')
  expect(wrapper.find('.fa.fa-spinner').length).toEqual(1)
  expect(wrapper.text()).not.toContain('Download')
  expect(wrapper.text()).not.toContain('Delete')
})
