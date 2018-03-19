import uuid from 'uuid'
import SDK from '../timeline-sdk'
import actions from './actions.js'

export default {
  create: function (eventData) {
    var assignedId = uuid.v4()

    return function (dispatch) {
      dispatch({
        type: actions.event.START_CREATE_EVENT,
        data: { Id: assignedId, ...eventData }
      })

      SDK.TimelineEvents.create({ TimelineEventId: assignedId, ...eventData })
        .then(() => {
          SDK.Timelines.linkEvent(eventData.TimelineId, assignedId)
        })
        .then(() => {
          dispatch({
            type: actions.event.SUCCESS_CREATE_EVENT,
            data: { Id: assignedId, ...eventData }
          })
        })
        .catch((error) => {
          dispatch({
            type: actions.event.ERROR_CREATE_EVENT,
            data: { Id: assignedId, ...eventData },
            error: error
          })
        })
    }
  },

  editTitle: function (eventData) {
    return function (dispatch) {
      dispatch({
        type: actions.event.START_EDIT_EVENT_TITLE,
        data: eventData
      })

      SDK.TimelineEvents.editTitle(eventData.Id, eventData.Title)
        .then((response) => {
          dispatch({
            type: actions.event.SUCCESS_EDIT_EVENT_TITLE,
            data: eventData
          })
        })
        .catch((error) => {
          dispatch({
            type: actions.timeline.ERROR_EDIT_EVENT_TITLE,
            data: eventData,
            error: error
          })
        })
    }
  },
  editDescription: function (eventData) {
    return function (dispatch) {
      dispatch({
        type: actions.event.START_EDIT_EVENT_DESCRIPTION,
        data: eventData
      })

      SDK.TimelineEvents.editDescription(eventData.Id, eventData.Description)
        .then((response) => {
          dispatch({
            type: actions.event.SUCCESS_EDIT_EVENT_DESCRIPTION,
            data: eventData
          })
        })
        .catch((error) => {
          dispatch({
            type: actions.timeline.ERROR_EDIT_EVENT_DESCRIPTION,
            data: eventData,
            error: error
          })
        })
    }
  },


  fetchForTimeline: function (timelineId) {
    return function (dispatch) {
      dispatch({
        type: actions.timeline.START_FETCH_EVENTS,
        data: { Id: timelineId }
      })

      SDK.Timelines.getLinkedEvents(timelineId)
        .then((linkedEvents) => {
          // [{ TimelineId: '...', TimelineEventId: '...' }]
          var requests = linkedEvents
            .map(function (timelineEventLink) {
              return timelineEventLink.TimelineEventId
            })
            .map(function (eventId) {
              return SDK.TimelineEvents.get(eventId)
            })
          return Promise.all(requests)
        })
        .then((events) => {
          events = events.map(function (event) {
            return {
              TimelineId: timelineId,
              ...event
            }
          })
          dispatch({
            type: actions.timeline.SUCCESS_FETCH_EVENTS,
            data: {
              TimelineId: timelineId,
              events: events
            }
          })
        })
        .catch((error) => {
          dispatch({
            type: actions.timeline.ERROR_FETCH_EVENTS,
            data: { Id: timelineId },
            error: error
          })
        })
    }
  },

  delete: function (eventId, timelineId) {
    return function (dispatch) {
      dispatch({
        type: actions.event.START_DELETE_EVENT,
        data: { Id: eventId, TimelineId: timelineId }
      })

      SDK.Timelines.unlinkEvent(timelineId, eventId)
        .then(() => {
          SDK.TimelineEvents.delete(eventId)
        })
        .then(() => {
          dispatch({
            type: actions.event.SUCCESS_DELETE_EVENT,
            data: { Id: eventId, TimelineId: timelineId }
          })
        })
        .catch((error) => {
          dispatch({
            type: actions.event.ERROR_CREATE_EVENT,
            data: { Id: eventId, TimelineId: timelineId },
            error: error
          })
        })
    }
  }
}
