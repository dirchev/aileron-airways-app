import uuid from 'uuid'
import SDK from '../timeline-sdk'
import actions from './actions.js'
import { push } from './../p2p-connection'

export default {
  // Create timeline and sync it to server
  create: function (timelineData) {
    var assignedId = uuid.v4()
    timelineData = {...timelineData}

    return function (dispatch) {
      dispatch({
        type: actions.timeline.START_CREATE_TIMELINE,
        data: {Id: assignedId, ...timelineData}
      })

      SDK.Timelines.create({TimelineId: assignedId, ...timelineData})
        .then((response) => {
          return response
        })
        .then((response) => {
          var action = {
            type: actions.timeline.SUCCESS_CREATE_TIMELINE,
            data: response
          }
          dispatch(action)
          push(action)
        })
        .catch((error) => {
          dispatch({
            type: actions.timeline.ERROR_CREATE_TIMELINE,
            data: {Id: assignedId, ...timelineData},
            error: error
          })
        })
    }
  },

  // Get all available timelines from server
  edit: function (timelineData) {
    return function (dispatch) {
      dispatch({
        type: actions.timeline.START_EDIT_TIMELINE,
        data: timelineData
      })

      SDK.Timelines.editTitle(timelineData.Id, timelineData.Title)
        .then((response) => {
          return response
        })
        .then((response) => {
          var action = {
            type: actions.timeline.SUCCESS_EDIT_TIMELINE,
            data: timelineData
          }
          dispatch(action)
          push(action)
        })
        .catch((error) => {
          dispatch({
            type: actions.timeline.ERROR_EDIT_TIMELINE,
            data: timelineData,
            error: error
          })
        })
    }
  },

  delete: function (timelineId) {
    return function (dispatch) {
      dispatch({
        type: actions.timeline.START_DELETE_TIMELINE,
        data: {Id: timelineId},
      })

      SDK.Timelines.delete(timelineId)
        .then((response) => {return response})
        .then((response) => {
          var action = {
            type: actions.timeline.SUCCESS_DELETE_TIMELINE,
            data: {Id: timelineId},
          }
          dispatch(action)
          push(action)
        })
        .catch((error) => {
          dispatch({
            type: actions.timeline.ERROR_DELETE_TIMELINE,
            data: {Id: timelineId},
            error: error
          })
        })
    }
  },

  // Get all available timelines from server
  fetchAll: function () {
    return function (dispatch) {
      dispatch({type: actions.ui.GLOBAL_LOADING, value: true})
      dispatch({type: actions.timelines.START_FETCH_TIMELINES})
      SDK.Timelines.getAll()
        .then((response) => {
          return response.map(function (t) {
            return t
          })
        })
        .then((response) => {
          dispatch({type: actions.ui.GLOBAL_LOADING, value: false})
          dispatch({type: actions.timelines.SUCCESS_FETCH_TIMELINES,
            data: response
          })
        })
        .catch((error) => {
          dispatch({type: actions.ui.GLOBAL_LOADING, value: false})
          dispatch({
            type: actions.timelines.ERROR_FETCH_TIMELINES,
            error: error
          })
        })
    }
  }
}
