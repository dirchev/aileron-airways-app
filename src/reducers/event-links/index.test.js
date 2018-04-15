import reducer from './index.js'
import df from 'deep-freeze'

it('sets the default state', function () {
  var result = reducer(undefined, {type: 'init'})
  expect(result).toEqual([])
})

it('processes START_LINK_EVENT', function () {
  var action = {
    type: 'START_LINK_EVENT',
    data: {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2'
    }
  }
  var state = df([])
  expect(reducer(state, action)).toEqual([
    {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: true,
      synced: false
    }
  ])
})

it('processes SUCCESS_LINK_EVENT', function () {
  var action = {
    type: 'SUCCESS_LINK_EVENT',
    data: {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2'
    }
  }
  var state = df([
    {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: true,
      synced: false
    }
  ])
  expect(reducer(state, action)).toEqual([
    {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: false,
      synced: true
    }
  ])
})

it('processes START_UNLINK_EVENT', function () {
  var action = {
    type: 'START_UNLINK_EVENT',
    data: {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2'
    }
  }
  var state = df([
    {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: false,
      synced: true
    },
    {
      TimelineEventId: '3',
      LinkedToTimelineEventId: '4',
      loading: false,
      synced: true
    }
  ])
  expect(reducer(state, action)).toEqual([
    {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: true,
      synced: false
    },
    {
      TimelineEventId: '3',
      LinkedToTimelineEventId: '4',
      loading: false,
      synced: true
    }
  ])
})

it('processes SUCCESS_UNLINK_EVENT', function () {
  var action = {
    type: 'SUCCESS_UNLINK_EVENT',
    data: {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2'
    }
  }
  var state = df([
    {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: false,
      synced: true
    },
    {
      TimelineEventId: '3',
      LinkedToTimelineEventId: '4',
      loading: false,
      synced: true
    }
  ])
  expect(reducer(state, action)).toEqual([
    {
      TimelineEventId: '3',
      LinkedToTimelineEventId: '4',
      loading: false,
      synced: true
    }
  ])
})

it('processes ERROR_UNLINK_EVENT', function () {
  var action = {
    type: 'ERROR_UNLINK_EVENT',
    data: {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
    },
    error: 'some error'
  }
  var state = df([
    {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: false,
      synced: true
    },
    {
      TimelineEventId: '3',
      LinkedToTimelineEventId: '4',
      loading: false,
      synced: true
    }
  ])
  expect(reducer(state, action)).toEqual([
    {
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: false,
      synced: false,
      error: 'some error'
    },
    {
      TimelineEventId: '3',
      LinkedToTimelineEventId: '4',
      loading: false,
      synced: true
    }
  ])
})

it('processes SUCCESS_GET_LINKED_EVENTS', function () {
  var action = {
    type: 'SUCCESS_GET_LINKED_EVENTS',
    data: [
      {
        Id: '2',
        TimelineEventId: '3',
        LinkedToTimelineEventId: '4',
      },
      {
        Id: '3',
        TimelineEventId: '5',
        LinkedToTimelineEventId: '6',
      }
    ],
  }
  var state = df([
    {
      Id: '1',
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: false,
      synced: true
    },
    {
      Id: '2',
      TimelineEventId: '3',
      LinkedToTimelineEventId: '4',
      loading: false,
      synced: true
    }
  ])
  expect(reducer(state, action)).toEqual([
    {
      Id: '1',
      TimelineEventId: '1',
      LinkedToTimelineEventId: '2',
      loading: false,
      synced: true,
    },
    {
      Id: '2',
      TimelineEventId: '3',
      LinkedToTimelineEventId: '4',
      loading: false,
      synced: true
    },
    {
      Id: '3',
      TimelineEventId: '5',
      LinkedToTimelineEventId: '6',
      loading: false,
      synced: true
    }
  ])
})
