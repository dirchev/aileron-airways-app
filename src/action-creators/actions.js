const actionsList = {
  ui: {
    SET_TIMELINES_FILTER: 'SET_TIMELINES_FILTER',
    OPEN_MODAL: 'OPEN_MODAL',
    GLOBAL_LOADING: 'GLOBAL_LOADING',
  },
  timeline: {
    START_CREATE_TIMELINE: 'START_CREATE_TIMELINE',
    OFFLINE_CREATE_TIMELINE: 'OFFLINE_CREATE_TIMELINE',
    SUCCESS_CREATE_TIMELINE: 'SUCCESS_CREATE_TIMELINE',
    ERROR_CREATE_TIMELINE: 'ERROR_CREATE_TIMELINE',

    START_EDIT_TIMELINE: 'START_EDIT_TIMELINE',
    OFFLINE_EDIT_TIMELINE: 'OFFLINE_EDIT_TIMELINE',
    SUCCESS_EDIT_TIMELINE: 'SUCCESS_EDIT_TIMELINE',
    ERROR_EDIT_TIMELINE: 'ERROR_EDIT_TIMELINE',

    START_DELETE_TIMELINE: 'START_DELETE_TIMELINE',
    OFFLINE_DELETE_TIMELINE: 'OFFLINE_DELETE_TIMELINE',
    SUCCESS_DELETE_TIMELINE: 'SUCCESS_DELETE_TIMELINE',
    ERROR_DELETE_TIMELINE: 'ERROR_DELETE_TIMELINE',

    START_FETCH_EVENTS: 'START_FETCH_EVENTS',
    SUCCESS_FETCH_EVENTS: 'SUCCESS_FETCH_EVENTS',
    ERROR_FETCH_EVENTS: 'ERROR_FETCH_EVENTS',
  },
  timelines: {
    START_FETCH_TIMELINES: 'START_FETCH_TIMELINES',
    SUCCESS_FETCH_TIMELINES: 'SUCCESS_FETCH_TIMELINES',
    ERROR_FETCH_TIMELINES: 'ERROR_FETCH_TIMELINES',
  },
  event: {
    START_CREATE_EVENT: 'START_CREATE_EVENT',
    SUCCESS_CREATE_EVENT: 'SUCCESS_CREATE_EVENT',
    ERROR_CREATE_EVENT: 'ERROR_CREATE_EVENT',

    START_FETCH_EVENT: 'START_FETCH_EVENT',
    SUCCESS_FETCH_EVENT: 'SUCCESS_FETCH_EVENT',
    ERROR_FETCH_EVENT: 'ERROR_FETCH_EVENT',

    START_EDIT_EVENT_TITLE: 'START_EDIT_EVENT_TITLE',
    SUCCESS_EDIT_EVENT_TITLE: 'SUCCESS_EDIT_EVENT_TITLE',
    ERROR_EDIT_EVENT_TITLE: 'ERROR_EDIT_EVENT_TITLE',

    START_EDIT_EVENT_DESCRIPTION: 'START_EDIT_EVENT_DESCRIPTION',
    SUCCESS_EDIT_EVENT_DESCRIPTION: 'SUCCESS_EDIT_EVENT_DESCRIPTION',
    ERROR_EDIT_EVENT_DESCRIPTION: 'ERROR_EDIT_EVENT_DESCRIPTION',

    START_EDIT_EVENT_LOCATION: 'START_EDIT_EVENT_LOCATION',
    SUCCESS_EDIT_EVENT_LOCATION: 'SUCCESS_EDIT_EVENT_LOCATION',
    ERROR_EDIT_EVENT_LOCATION: 'ERROR_EDIT_EVENT_LOCATION',

    START_DELETE_EVENT: 'START_DELETE_EVENT',
    SUCCESS_DELETE_EVENT: 'SUCCESS_DELETE_EVENT',
    ERROR_DELETE_EVENT: 'ERROR_DELETE_EVENT',

    START_LINK_EVENT: 'START_LINK_EVENT',
    SUCCESS_LINK_EVENT: 'SUCCESS_LINK_EVENT',
    ERROR_LINK_EVENT: 'ERROR_LINK_EVENT',

    START_UNLINK_EVENT: 'START_UNLINK_EVENT',
    SUCCESS_UNLINK_EVENT: 'SUCCESS_UNLINK_EVENT',
    ERROR_UNLINK_EVENT: 'ERROR_UNLINK_EVENT',

    START_GET_LINKED_EVENTS: 'START_GET_LINKED_EVENTS',
    SUCCESS_GET_LINKED_EVENTS: 'SUCCESS_GET_LINKED_EVENTS',
    ERROR_GET_LINKED_EVENTS: 'ERROR_GET_LINKED_EVENTS'
  },
  attachment: {
    START_CREATE_ATTACHMENT: 'START_CREATE_ATTACHMENT',
    SUCCESS_CREATE_ATTACHMENT: 'SUCCESS_CREATE_ATTACHMENT',
    ERROR_CREATE_ATTACHMENT: 'ERROR_CREATE_ATTACHMENT',

    START_DELETE_ATTACHMENT: 'START_DELETE_ATTACHMENT',
    SUCCESS_DELETE_ATTACHMENT: 'SUCCESS_DELETE_ATTACHMENT',
    ERROR_DELETE_ATTACHMENT: 'ERROR_DELETE_ATTACHMENT',

    START_GET_EVENT_ATTACHMENTS : 'START_GET_EVENT_ATTACHMENTS',
    SUCCESS_GET_EVENT_ATTACHMENTS: 'SUCCESS_GET_EVENT_ATTACHMENTS',
    ERROR_GET_EVENT_ATTACHMENTS: 'ERROR_GET_EVENT_ATTACHMENTS'
  },
  sync: {
    SYNC_TIMELINE: 'SYNC_TIMELINE',
    SYNC_EVENT: 'SYNC_EVENT',
    SYNC_ATTACHMENT: 'SYNC_ATTACHMENT',
    SYNC_EVENTLINK: 'SYNC_EVENTLINK',
  }
}

export default actionsList
