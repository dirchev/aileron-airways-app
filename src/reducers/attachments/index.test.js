import reducer from './index.js'
import df from 'deep-freeze'

it('sets the default state', function () {
  var result = reducer(undefined, {type: 'init'})
  expect(result).toEqual({})
})

it('processes SUCCESS_GET_EVENT_ATTACHMENTS', function () {
  var action = {
    type: 'SUCCESS_GET_EVENT_ATTACHMENTS',
    data: {
      attachments: [{
        Id: 'Attachment1',
        Title: 'Attachment Title'
      }]
    }
  }
  var state = df({})
  expect(reducer(state, action)).toEqual({
    'Attachment1': {
      Id: 'Attachment1',
      Title: 'Attachment Title',
      loading: false,
      synced: true
    }
  })
})

it('processes START_CREATE_ATTACHMENT', function () {
  var action = {
    type: 'START_CREATE_ATTACHMENT',
    data: {
      Id: 'Attachment1',
      Title: 'Attachment Title'
    }
  }
  var state = df({})
  expect(reducer(state, action)).toEqual({
    'Attachment1': {
      Id: 'Attachment1',
      Title: 'Attachment Title',
      loading: true,
      synced: false
    }
  })
})

it('processes SYNC_ATTACHMENT', function () {
  var action = {
    type: 'SYNC_ATTACHMENT',
    data: {
      Id: 'Attachment1',
      Title: 'Attachment Title'
    }
  }
  var state = df({})
  expect(reducer(state, action)).toEqual({
    'Attachment1': {
      Id: 'Attachment1',
      Title: 'Attachment Title',
      loading: false,
      synced: true
    }
  })
})

it('processes ERORR_CREATE_ATTACHMENT', function () {
  var action = {
    type: 'ERROR_CREATE_ATTACHMENT',
    data: {
      Id: 'Attachment1',
      Title: 'Attachment Title'
    },
    error: 'can not delete attachment for some reason'
  }
  var state = df({})
  expect(reducer(state, action)).toEqual({
    'Attachment1': {
      Id: 'Attachment1',
      Title: 'Attachment Title',
      loading: false,
      synced: false,
      error: 'can not delete attachment for some reason'
    }
  })
})

it('processes ERORR_CREATE_ATTACHMENT', function () {
  var action = {
    type: 'SUCCESS_DELETE_ATTACHMENT',
    data: {
      Id: 'Attachment1',
      Title: 'Attachment Title'
    }
  }

  var state = df({
    'Attachment1': {
      Id: 'Attachment1',
      Title: 'Attachment Title',
      loading: false,
      synced: true
    }
  })
  expect(reducer(state, action)).toEqual({})
})
