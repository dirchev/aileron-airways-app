it('exports an SDK object', function () {
  var sdk = require('./timeline-sdk.js').default
  expect(sdk).toBeDefined()
  expect(sdk.Timelines).toBeDefined()
  expect(sdk.TimelineEvents).toBeDefined()
  expect(sdk.Attachments).toBeDefined()
})
