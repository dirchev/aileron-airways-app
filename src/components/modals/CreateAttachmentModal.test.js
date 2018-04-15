import React from 'react'
import { shallow } from 'enzyme'

import { CreateAttachmentModal } from './CreateAttachmentModal'
import Input from '../inputs/Input'

it('renders without crashing', function () {
  const props = {
    onClose: jest.fn(),
    createAttachment: jest.fn(),
  }
  const wrapper = shallow(<CreateAttachmentModal {...props} />)
})

it('renders without crashing', function () {
  const props = {
    onClose: jest.fn(),
    createAttachment: jest.fn(),
  }
  const wrapper = shallow(<CreateAttachmentModal {...props} />)
  wrapper.find(Input).simulate('change', 'TitleChange')
  expect(wrapper.state().title).toEqual('TitleChange')
  wrapper.find('input[type=\'file\']').simulate('change', {
    target: {
      files: ['file1'],
      value: '/something/filename.png'
    }
  })
  expect(wrapper.state().file).toEqual('file1')
  expect(wrapper.state().fileName).toEqual('filename.png')
})

it('executes CreateAttachment on submit', function () {
  const props = {
    onClose: jest.fn(),
    createAttachment: jest.fn(),
  }
  const wrapper = shallow(<CreateAttachmentModal {...props} />)
  wrapper.setState({
    title: 'Some Title',
    file: 'file1',
    fileName: 'someFilename'
  })
  wrapper.find('form').simulate('submit', {preventDefault: jest.fn()})
  expect(props.createAttachment).toBeCalledWith({
    Title: 'Some Title',
    file: 'file1'
  })
})
