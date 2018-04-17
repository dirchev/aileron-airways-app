import uuid from 'uuid'
import SDK from '../timeline-sdk'
import actions from './actions.js'
import { push } from '../p2p-connection'

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
          var action = {
            type: actions.event.SUCCESS_CREATE_EVENT,
            data: { Id: assignedId, ...eventData }
          }
          dispatch(action)
          push(action)
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
          var action = {
            type: actions.event.SUCCESS_EDIT_EVENT_TITLE,
            data: eventData
          }
          dispatch(action)
          push(action)
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
          var action = {
            type: actions.event.SUCCESS_EDIT_EVENT_DESCRIPTION,
            data: eventData
          }
          dispatch(action)
          push(action)
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

  editLocation: function (eventData) {
    return function (dispatch) {
      dispatch({
        type: actions.event.START_EDIT_EVENT_LOCATION,
        data: eventData
      })

      SDK.TimelineEvents.editLocation(eventData.Id, eventData.Location)
        .then((response) => {
          var action = {
            type: actions.event.SUCCESS_EDIT_EVENT_LOCATION,
            data: eventData
          }
          dispatch(action)
          push(action)
        })
        .catch((error) => {
          dispatch({
            type: actions.timeline.ERROR_EDIT_EVENT_LOCATION,
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
          var action = {
            type: actions.event.SUCCESS_DELETE_EVENT,
            data: { Id: eventId, TimelineId: timelineId }
          }
          dispatch(action)
          push(action)
        })
        .catch((error) => {
          dispatch({
            type: actions.event.ERROR_CREATE_EVENT,
            data: { Id: eventId, TimelineId: timelineId },
            error: error
          })
        })
    }
  },

  getLinkedEvents: function (eventId) {
    return function (dispatch) {
      dispatch({
        type: actions.event.START_GET_LINKED_EVENTS,
        data: { TimelineEventId: eventId }
      })

      SDK.TimelineEvents.getLinkedEvents(eventId)
        .then(function (result) {
          dispatch({
            type: actions.event.SUCCESS_GET_LINKED_EVENTS,
            data: result
          })
        })
        .catch(function (error) {
          dispatch({
            type: actions.event.ERROR_GET_LINKED_EVENTS,
            data: { TimelineEventId: eventId },
            error: error
          })
        })
    }
  },

  linkEvent: function (eventId, toLinkEventId) {
    return function (dispatch) {
      dispatch({
        type: actions.event.START_LINK_EVENT,
        data: { TimelineEventId: eventId, LinkedToTimelineEventId: toLinkEventId }
      })

      SDK.TimelineEvents.linkEvent(eventId, toLinkEventId)
        .then(function (result) {
          var action = {
            type: actions.event.SUCCESS_LINK_EVENT,
            data: result
          }
          dispatch(action)
          push(action)
        })
        .catch(function (error) {
          dispatch({
            type: actions.event.ERROR_LINK_EVENT,
            data: { TimelineEventId: eventId, LinkedToTimelineEventId: toLinkEventId },
            error: error
          })
        })
    }
  },

  unlinkEvent: function (eventId, toUnlinkEventId) {
    return function (dispatch) {
      dispatch({
        type: actions.event.START_UNLINK_EVENT,
        data: { TimelineEventId: eventId, LinkedToTimelineEventId: toUnlinkEventId }
      })

      SDK.TimelineEvents.unlinkEvent(eventId, toUnlinkEventId)
        .then(function (result) {
          var action = {
            type: actions.event.SUCCESS_UNLINK_EVENT,
            data: { TimelineEventId: eventId, LinkedToTimelineEventId: toUnlinkEventId },
          }
          dispatch(action)
          push(action)
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actions.event.ERROR_UNLINK_EVENT,
            data: { TimelineEventId: eventId, LinkedToTimelineEventId: toUnlinkEventId },
            error: error
          })
        })
    }
  }
}
