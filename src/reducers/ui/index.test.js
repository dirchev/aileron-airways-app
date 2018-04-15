import reducer from './index.js'
import df from 'deep-freeze'

it('sets the default state', function () {
  var result = reducer(undefined, {type: 'init'})
  expect(result).toEqual({
    timelinesFilter: null,
    modal: null,
    modalProps: null,
    globalLoading: false,
  })
})

it('processes SET_TIMELINES_FILTER', function () {
  var action = {
    type: 'SET_TIMELINES_FILTER',
    data: 'something'
  }
  var state = df({
    timelinesFilter: null,
    modal: null,
    modalProps: null,
    globalLoading: false,
  })
  expect(reducer(state, action)).toEqual({
    timelinesFilter: 'something',
    modal: null,
    modalProps: null,
    globalLoading: false,
  })
})

it('processes GLOBAL_LOADING', function () {
  var action = {
    type: 'GLOBAL_LOADING',
    value: true
  }
  var state = df({
    timelinesFilter: null,
    modal: null,
    modalProps: null,
    globalLoading: false,
  })
  expect(reducer(state, action)).toEqual({
    timelinesFilter: null,
    modal: null,
    modalProps: null,
    globalLoading: true,
  })
})

it('processes OPEN_MODAL', function () {
  var action = {
    type: 'OPEN_MODAL',
    data: 'createEvent',
    props: {id: 1}
  }
  var state = df({
    timelinesFilter: null,
    modal: null,
    modalProps: null,
    globalLoading: false,
  })
  expect(reducer(state, action)).toEqual({
    timelinesFilter: null,
    modal: 'createEvent',
    modalProps: {id: 1},
    globalLoading: false,
  })
})
