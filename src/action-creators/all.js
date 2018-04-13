import SDK from '../timeline-sdk'
import actions from './actions.js'

var denormalizeLoadAllResult = (response) => {
  var data = {
    timelines: [],
    events: [],
    eventLinks: [],
    attachments: []
  }

  response.Timelines.forEach(function (timeline) {
    data.timelines.push({
      Id: timeline.Id,
      Title: timeline.Title,
      CreationTimeStamp: timeline.CreationTimeStamp
    })
    timeline.TimelineEvents.forEach(function (event) {
      data.events.push({
        Id: event.Id,
        Title: event.Title,
        Description: event.Description,
        EventDateTime: event.EventDateTime,
        Location: event.Location,
        TimelineId: timeline.Id,
      })
      event.LinkedTimelineEventIds.forEach(function (linkedEventId) {
        data.eventLinks.push({
          TimelineEventId: event.Id,
          LinkedToTimelineEventId: linkedEventId
        })
      })
      event.Attachments.forEach(function (attachment) {
        data.attachments.push({
          Id: attachment.Id,
          TimelineEventId: attachment.TimelineEventId,
          Title: attachment.Title
        })
      })
    })
  })

  return data
}

export default {
  loadAllData: function () {
    return function (dispatch) {
      dispatch({type: actions.ui.GLOBAL_LOADING, value: true})
      SDK.Timelines.getTimelinesAndEvents()
        .then((result) => {
          return denormalizeLoadAllResult(result)
        })
        .then(({timelines, eventLinks, events, attachments}) => {
          timelines.forEach(function (timeline) {
            dispatch({
              type: actions.sync.SYNC_TIMELINE,
              data: timeline
            })
          })
          events.forEach(function (event) {
            dispatch({
              type: actions.sync.SYNC_EVENT,
              data: event
            })
          })
          eventLinks.forEach(function (eventLink) {
            dispatch({
              type: actions.sync.SYNC_EVENTLINK,
              data: eventLink
            })
          })
          attachments.forEach(function (attachment) {
            dispatch({
              type: actions.sync.SYNC_ATTACHMENT,
              data: attachment
            })
          })
        })
        .then(() => {
          dispatch({type: actions.ui.GLOBAL_LOADING, value: false})
        })
    }
  }
}
