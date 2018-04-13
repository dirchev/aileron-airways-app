import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import { Provider } from 'react-redux'
import store from './store'

it('renders without crashing', () => {
  const div = document.createElement('div')

  var toRender = (
    <Provider store={store}>
      <App />
    </Provider>
  )
  ReactDOM.render(toRender, div)
})
