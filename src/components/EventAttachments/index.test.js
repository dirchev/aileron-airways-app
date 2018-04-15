import React from 'react'
import { EventAttachments } from './index.js'
import AttachmentItem from './AttachmentItem.js'
import { shallow } from 'enzyme'

it('does not render any attachment items if no attachments', () => {
  const props = {
    event: {
      Id: 'Event1',
      Title: 'Event Title',
      Description: 'Event Description',
    },
    attachments: [],
    getAttachments:  () => {},
    deleteAttachment:  () => {}
  }
  const wrapper = shallow(<EventAttachments {...props} />)
  expect(wrapper.find(AttachmentItem).length).toEqual(0)
})

it('renders attachment item for each attachment', () => {
  const props = {
    event: {
      Id: 'Event1',
      Title: 'Event Title',
      Description: 'Event Description',
    },
    attachments: [
      {
        Id: 'Attachment 1',
        Title: 'Attachment 1'
      }
    ],
    getAttachments:  () => {},
    deleteAttachment:  () => {}
  }
  const wrapper = shallow(<EventAttachments {...props}/>)
  expect(wrapper.find(AttachmentItem).length).toEqual(1)
})

it('invokes the getAttachments function', () => {
  return new Promise(function (resolve, reject) {
    const props = {
      event: {
        Id: 'Event1',
        Title: 'Event Title',
        Description: 'Event Description',
      },
      attachments: [
        {
          Id: 'Attachment 1',
          Title: 'Attachment 1'
        }
      ],
      getAttachments:  () => {
        resolve()
      },
      deleteAttachment:  () => {}
    }
    const wrapper = shallow(<EventAttachments {...props}/>)
    expect(wrapper.find(AttachmentItem).length).toEqual(1)
  })
})
