import reducer from './index.js'
import df from 'deep-freeze'

it('sets the default state', function () {
  var result = reducer(undefined, {type: 'init'})
  expect(result).toEqual({})
})

it('processes START_CREATE_TIMELINE', function () {
  var action = {
    type: 'START_CREATE_TIMELINE',
    data: {
      Id: '1',
      Title: 'Title'
    }
  }
  var state = df({})
  expect(reducer(state, action)).toEqual({
    '1': {
      Id: '1',
      Title: 'Title',
      loading: true,
      synced: false
    }
  })
})

it('processes SUCCESS_CREATE_TIMELINE', function () {
  var action = {
    type: 'SUCCESS_CREATE_TIMELINE',
    data: {
      Id: '1',
      Title: 'Title'
    }
  }
  var state = df({
    '1': {
      Id: '1',
      Title: 'Title',
      loading: true,
      synced: false
    }
  })
  expect(reducer(state, action)).toEqual({
    '1': {
      Id: '1',
      Title: 'Title',
      loading: false,
      synced: true
    }
  })
})

it('processes ERROR_CREATE_TIMELINE', function () {
  var action = {
    type: 'ERROR_CREATE_TIMELINE',
    data: {
      Id: '1',
      Title: 'Title'
    },
    error: 'some error'
  }
  var state = df({
    '1': {
      Id: '1',
      Title: 'Title',
      loading: true,
      synced: false
    }
  })
  expect(reducer(state, action)).toEqual({
    '1': {
      Id: '1',
      Title: 'Title',
      loading: false,
      synced: false,
      error: 'some error'
    }
  })
})

it('processes SUCCESS_DELETE_TIMELINE', function () {
  var action = {
    type: 'SUCCESS_DELETE_TIMELINE',
    data: {
      Id: '1',
      Title: 'Title'
    }
  }
  var state = df({
    '1': {
      Id: '1',
      Title: 'Title',
      loading: true,
      synced: false
    }
  })
  expect(reducer(state, action)).toEqual({})
})

it('processes SUCCESS_FETCH_TIMELINES', function () {
  var action = {
    type: 'SUCCESS_FETCH_TIMELINES',
    data: [
      {Id: '1', Title: 'Title'},
      {Id: '2', Title: 'Title'},
      {Id: '3', Title: 'Title'},
    ]
  }
  var state = df({
    '1': {
      Id: '1',
      Title: 'Title',
      loading: false,
      synced: false
    }
  })
  expect(reducer(state, action)).toEqual({
    '1': {
      Id: '1',
      Title: 'Title',
      loading: false,
      synced: true
    },
    '2': {
      Id: '2',
      Title: 'Title',
      loading: false,
      synced: true
    },
    '3': {
      Id: '3',
      Title: 'Title',
      loading: false,
      synced: true
    }
  })
})
