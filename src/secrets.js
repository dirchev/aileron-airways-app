export default {
  'timelineSDK': {
    endpoint: process.env.REACT_APP_ENDPOINT || 'https://timeline-api-dirchev.herokuapp.com/',
    TenantId: process.env.REACT_APP_TENANT_ID,
    AuthToken: process.env.REACT_APP_AUTH_TOKEN
  }
}
