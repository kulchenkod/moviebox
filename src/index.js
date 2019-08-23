import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import { store, persistor } from "./stores/store";
import './index.css';
import "./configs/axios";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);