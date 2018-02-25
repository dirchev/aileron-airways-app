import uuid from 'uuid'
import SDK from '../timeline-sdk'

export default {
  // Create timeline and sync it to server
  create: function (timelineData) {
    var assignedId = uuid.v4()
    timelineData = {...timelineData}

    return function (dispatch) {
      dispatch({type: 'START_CREATE_TIMELINE', data: {Id: assignedId, ...timelineData}})
      SDK.Timelines.create({TimelineId: assignedId, ...timelineData})
        .then((response) => {
          return response
        })
        .then((response) => {dispatch({type: 'SUCCESS_CREATE_TIMELINE', data: response})})
        .catch((error) => {dispatch({type: 'ERROR_CREATE_TIMELINE', data: timelineData, error: error})})
    }
  },

  // Get all available timelines from server
  fetchAll: function () {
    return function (dispatch) {
      dispatch({type: 'START_FETCH_TIMELINES'})
      SDK.Timelines.getAll()
        .then((response) => {
          return response.map(function (t) {
            return t
          })
        })
        .then((response) => {dispatch({type: 'SUCCESS_FETCH_TIMELINES', data: response})})
        .catch((error) => {dispatch({type: 'ERROR_FETCH_TIMELINES', error: error})})
    }
  },

  // Set timeline search filter
  setTimelinesFilter: function (filterTerm) {
    return function (dispatch) {
      dispatch({
        type: 'SET_TIMELINES_FILTER',
        data: filterTerm
      })
    }
  }
}
