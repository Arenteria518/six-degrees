import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App'

const store = createStore(() => [], );

ReactDOM.render(<App />, document.querySelector('#root'));