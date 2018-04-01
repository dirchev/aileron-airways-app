import secrets from './secrets.js'
import IdeagenTimelineSDK from 'ideagen-timeline-sdk'

var ideagenTimelineSDK = new IdeagenTimelineSDK(secrets.timelineSDK)

export default ideagenTimelineSDK
