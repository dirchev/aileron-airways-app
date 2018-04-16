import store from './store.js'

test('creates a store without initial state', () => {
  expect(store).toBeDefined()
  expect(store.getState()).toEqual({
    timelines: {},
    ui: {
      timelinesFilter: null,
      modal: null,
      modalProps: null,
      globalLoading: true
    },
    events: {},
    eventLinks: [],
    attachments: {}
  })
})
