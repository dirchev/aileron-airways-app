import reducer from './index.js'
import df from 'deep-freeze'

it('sets the default state', function () {
  var result = reducer(undefined, {type: 'init'})
  expect(result).toEqual({})
})

it('processes START_CREATE_EVENT', function () {
  var action = {
    type: 'START_CREATE_EVENT',
    data: {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date'
    }
  }
  var state = df({})
  expect(reducer(state, action)).toEqual({
    '1': {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: true,
      synced: false
    }
  })
})

it('processes SUCCESS_CREATE_EVENT', function () {
  var action = {
    type: 'SUCCESS_CREATE_EVENT',
    data: {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date'
    }
  }
  var state = df({
    '1': {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: true,
      synced: false
    }
  })
  expect(reducer(state, action)).toEqual({
    '1': {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: false,
      synced: true
    }
  })
})

it('processes ERROR_CREATE_EVENT', function () {
  var action = {
    type: 'ERROR_CREATE_EVENT',
    data: {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date'
    },
    error: 'some error'
  }
  var state = df({
    '1': {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: true,
      synced: false
    }
  })
  expect(reducer(state, action)).toEqual({
    '1': {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: false,
      synced: false,
      error: 'some error'
    }
  })
})

it('processes SUCCESS_FETCH_EVENTS', function () {
  var action = {
    type: 'SUCCESS_FETCH_EVENTS',
    data: {events: [
      {
        Id: '1',
        Title: 'Title',
        Description: 'Description',
        Location: 'Location',
        EventDateTime: 'some date'
      },
      {
        Id: '2',
        Title: 'Title',
        Description: 'Description',
        Location: 'Location',
        EventDateTime: 'some date'
      }
    ]}
  }
  var state = df({
    '1': {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: true,
      synced: false
    }
  })
  expect(reducer(state, action)).toEqual({
    '1': {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: false,
      synced: true
    },
    '2': {
      Id: '2',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: false,
      synced: true
    }
  })
})

it('processes SUCCESS_DELETE_EVENT', function () {
  var action = {
    type: 'SUCCESS_DELETE_EVENT',
    data: {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date'
    }
  }
  var state = df({
    '1': {
      Id: '1',
      Title: 'Title',
      Description: 'Description',
      Location: 'Location',
      EventDateTime: 'some date',
      loading: true,
      synced: false
    }
  })
  expect(reducer(state, action)).toEqual({})
})
