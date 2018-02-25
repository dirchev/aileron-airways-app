import secrets from './secrets.js'
import IdeagenTimelineSDK from 'ideagen-timeline-sdk'

var ideagenTimelineSDK = new IdeagenTimelineSDK({
  ...secrets.timelineSDK,
  endpoint: 'http://timeline-api-dirchev.herokuapp.com/'
})

export default ideagenTimelineSDK