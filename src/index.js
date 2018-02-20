// CSS
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './styles/index.css'
// !CSS

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
