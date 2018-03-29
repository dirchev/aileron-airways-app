// CSS
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './build-index.css'
import '../node_modules/react-datetime/css/react-datetime.css'

// !CSS

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import datetime from 'react-datetime'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
